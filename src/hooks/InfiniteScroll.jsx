import React, { useState, useEffect } from "react";

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 1,
    });
    observer.observe(document.querySelector(".sentinel"));
    return () => observer.disconnect();
  }, [page]);

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchMoreItems();
      }
    });
  };

  const fetchMoreItems = () => {
    // 여기에서는 간단한 예시로 새로운 아이템을 생성하여 추가합니다.
    const newItems = Array.from(
      { length: 5 },
      (_, index) => `Item ${items.length + index + 1}`
    );
    setItems((prevItems) => [...prevItems, ...newItems]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}></div>
      <div
        className="sentinel"
        style={{ border: "1px solid transparent", height: "1px" }}
      ></div>
    </div>
  );
}

export default InfiniteScroll;
