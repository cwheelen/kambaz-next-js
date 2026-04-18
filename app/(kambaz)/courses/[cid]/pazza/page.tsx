"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setPosts, setFolders, setSelectedPostId, addPost } from "./reducer";
import * as client from "./client";
import NewPostScreen from "./NewPostScreen";
import PostScreen from "./PostScreen";
import ClassAtAGlance from "./ClassAtAGlance";

function groupPostsByDate(posts: any[]) {
  const now = new Date();
  const todayStr = now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  const lastWeekStart = new Date(now);
  lastWeekStart.setDate(now.getDate() - 7);

  const groups: Record<string, any[]> = {};
  posts.forEach((post) => {
    const d = new Date(post.createdAt);
    const dStr = d.toDateString();
    let key: string;
    if (dStr === todayStr) {
      key = "TODAY";
    } else if (dStr === yesterdayStr) {
      key = "YESTERDAY";
    } else if (d >= lastWeekStart) {
      key = "LAST WEEK";
    } else {
      const day = d.getDay();
      const diffToMon = day === 0 ? -6 : 1 - day;
      const mon = new Date(d);
      mon.setDate(d.getDate() + diffToMon);
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);
      const fmt = (dt: Date) => `${dt.getMonth() + 1}/${dt.getDate()}`;
      key = `${fmt(mon)} - ${fmt(sun)}`;
    }
    if (!groups[key]) groups[key] = [];
    groups[key].push(post);
  });
  return groups;
}

export default function PazzaPage() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { posts, folders, selectedPostId } = useSelector(
    (state: RootState) => state.pazzaReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [showNewPost, setShowNewPost] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [enrolledUsers, setEnrolledUsers] = useState<any[]>([]);
  const [folderError, setFolderError] = useState<string | null>(null);

  useEffect(() => {
    if (!cid) return;

    // Load posts
    client.findPostsForCourse(cid as string)
      .then((data) => dispatch(setPosts(data)))
      .catch((err) => console.error("Failed to load posts:", err));

    // Load folders — backend already seeds defaults, so just fetch and dispatch
    client.findFoldersForCourse(cid as string)
      .then((data) => {
        dispatch(setFolders(data));
        setFolderError(null);
      })
      .catch((err) => {
        console.error("Failed to load folders:", err);
        setFolderError(
          "Could not load folders. Check that NEXT_PUBLIC_HTTP_SERVER is set correctly in your Vercel environment variables."
        );
      });

    // Load enrolled users
    const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
    fetch(`${HTTP_SERVER}/api/courses/${cid}/users`, { credentials: "include" })
      .then((r) => r.json())
      .then((users) => setEnrolledUsers(users))
      .catch(() => setEnrolledUsers([]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  const isInstructor =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const visiblePosts = posts.filter((p: any) => {
    if (p.postTo === "class") return true;
    if (p.authorId === currentUser?._id) return true;
    if (isInstructor) return true;
    if (
      p.postTo === "individual" &&
      Array.isArray(p.visibleTo) &&
      p.visibleTo.includes(currentUser?._id)
    )
      return true;
    return false;
  });

  const folderFiltered = activeFolder
    ? visiblePosts.filter(
        (p: any) => Array.isArray(p.folders) && p.folders.includes(activeFolder)
      )
    : visiblePosts;

  const filtered = search
    ? folderFiltered.filter(
        (p: any) =>
          p.summary?.toLowerCase().includes(search.toLowerCase()) ||
          p.details
            ?.replace(/<[^>]+>/g, "")
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    : folderFiltered;

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const groups = groupPostsByDate(sorted);
  const groupOrder = ["TODAY", "YESTERDAY", "LAST WEEK"];
  const extraKeys = Object.keys(groups)
    .filter((k) => !groupOrder.includes(k))
    .sort((a, b) => b.localeCompare(a));
  const orderedKeys = [...groupOrder, ...extraKeys].filter(
    (k) => groups[k]?.length
  );

  const selectedPost =
    posts.find((p: any) => p._id === selectedPostId) || null;

  const handleSelectPost = async (postId: string) => {
    dispatch(setSelectedPostId(postId));
    setShowNewPost(false);
    try {
      await client.incrementPostView(postId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      /* ignore */
    }
  };

  const handleNewPost = async (post: any) => {
    const created = await client.createPost(cid as string, {
      ...post,
      authorId: currentUser?._id,
      authorName: currentUser
        ? `${(currentUser as any).firstName ?? ""} ${(currentUser as any).lastName ?? ""}`.trim() ||
          currentUser.username
        : "Unknown",
      authorRole: currentUser?.role,
      createdAt: new Date().toISOString(),
      views: 0,
    });
    dispatch(addPost(created));
    dispatch(setSelectedPostId(created._id));
    setShowNewPost(false);
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      className="d-flex"
      style={{ height: "calc(100vh - 110px)", overflow: "hidden" }}
    >
      {sidebarVisible && (
        <div
          className="border-end d-flex flex-column"
          style={{ width: 320, minWidth: 280, overflowY: "auto" }}
        >
          {/* Folder filter bar */}
          {folderError ? (
            <div className="alert alert-warning m-2 p-2" style={{ fontSize: 12 }}>
              ⚠️ {folderError}
            </div>
          ) : (
            <div
              className="d-flex border-bottom px-2 py-2"
              style={{ overflowX: "auto", gap: 6, flexWrap: "nowrap" }}
            >
              {folders.length === 0 ? (
                <span className="text-muted" style={{ fontSize: 12 }}>
                  Loading folders...
                </span>
              ) : (
                folders.map((f: any) => (
                  <button
                    key={f._id}
                    onClick={() =>
                      setActiveFolder(activeFolder === f._id ? null : f._id)
                    }
                    className={`btn btn-sm ${
                      activeFolder === f._id
                        ? "btn-danger"
                        : "btn-outline-secondary"
                    }`}
                    style={{ whiteSpace: "nowrap", fontSize: 12 }}
                  >
                    {f.name}
                  </button>
                ))
              )}
            </div>
          )}

          {/* Toolbar */}
          <div className="d-flex align-items-center px-2 py-2 border-bottom gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSidebarVisible(false)}
              title="Hide sidebar"
            >
              ◀
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                setShowNewPost(true);
                dispatch(setSelectedPostId(null));
              }}
            >
              + New Post
            </button>
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search or add a post..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Post list */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            {orderedKeys.map((groupKey) => (
              <div key={groupKey}>
                <div
                  className="px-3 py-1 d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: "#f5f5f5",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  onClick={() =>
                    setCollapsed((c) => ({ ...c, [groupKey]: !c[groupKey] }))
                  }
                >
                  <span>▾ {groupKey}</span>
                </div>
                {!collapsed[groupKey] &&
                  groups[groupKey].map((post: any) => (
                    <div
                      key={post._id}
                      onClick={() => handleSelectPost(post._id)}
                      className={`px-3 py-2 border-bottom ${
                        selectedPostId === post._id
                          ? "bg-danger bg-opacity-10 border-start border-3 border-danger"
                          : ""
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div
                          className="fw-bold"
                          style={{ fontSize: 13, lineHeight: 1.3 }}
                        >
                          {post.summary}
                        </div>
                        <span
                          className="text-muted ms-2"
                          style={{ fontSize: 11, whiteSpace: "nowrap" }}
                        >
                          {formatTime(post.createdAt)}
                        </span>
                      </div>
                      <div className="text-muted" style={{ fontSize: 12, marginTop: 2 }}>
                        {post.authorRole === "FACULTY" ||
                        post.authorRole === "ADMIN"
                          ? "Instr"
                          : "Student"}{" "}
                        · {post.authorName}
                      </div>
                      <div
                        className="text-secondary"
                        style={{
                          fontSize: 12,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          marginTop: 2,
                        }}
                      >
                        {post.details?.replace(/<[^>]+>/g, "")}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
            {sorted.length === 0 && (
              <div
                className="text-center text-muted p-4"
                style={{ fontSize: 13 }}
              >
                No posts yet.
              </div>
            )}
          </div>
        </div>
      )}

      {!sidebarVisible && (
        <div className="d-flex align-items-start pt-3 ps-2 border-end">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setSidebarVisible(true)}
            title="Show sidebar"
          >
            ▶
          </button>
        </div>
      )}

      <div className="flex-fill" style={{ overflowY: "auto" }}>
        {showNewPost ? (
          <NewPostScreen
            folders={folders}
            onSubmit={handleNewPost}
            onCancel={() => setShowNewPost(false)}
            currentUser={currentUser}
            enrolledUsers={enrolledUsers}
          />
        ) : selectedPost ? (
          <PostScreen
            post={selectedPost}
            currentUser={currentUser}
            onPostUpdated={(updated: any) =>
              dispatch({ type: "pazza/updatePost", payload: updated })
            }
            onPostDeleted={(id: string) => {
              dispatch({ type: "pazza/deletePost", payload: id });
              dispatch(setSelectedPostId(null));
            }}
          />
        ) : (
          <ClassAtAGlance posts={visiblePosts} courseId={cid as string} />
        )}
      </div>
    </div>
  );
}