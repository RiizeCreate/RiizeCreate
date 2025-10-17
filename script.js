document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("blogForm");
  const postsContainer = document.getElementById("posts");

  // Ambil dari localStorage saat pertama load
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  function renderPosts() {
    postsContainer.innerHTML = "";

    if (posts.length === 0) {
      postsContainer.innerHTML = "<p>Belum ada postingan.</p>";
      return;
    }

    posts.forEach((post, index) => {
      const postDiv = document.createElement("div");
      postDiv.className = "post";

      const title = document.createElement("h3");
      title.textContent = post.title;
      title.addEventListener("click", () => {
        alert(`Judul: ${post.title}\n\n${post.content}`);
      });

      const content = document.createElement("p");
      content.textContent = post.content.substring(0, 100) + "...";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Hapus";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        if (confirm("Yakin ingin menghapus postingan ini?")) {
          posts.splice(index, 1);
          savePosts();
          renderPosts();
        }
      });

      postDiv.appendChild(title);
      postDiv.appendChild(deleteBtn);
      postDiv.appendChild(content);
      postsContainer.appendChild(postDiv);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title && content) {
      posts.unshift({ title, content });
      savePosts();
      renderPosts();
      form.reset();
    }
  });

  renderPosts();
});
