import { ArrowLeft, Clock, ExternalLink, Heart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function MyList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    likedItems,
    laterItems,
    removeFromLiked,
    removeFromLater,
    moveToLater,
    moveToLiked,
  } = useUser();
  const [listType, setListType] = useState("liked");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "later") {
      setListType("later");
    } else {
      setListType("liked");
    }
  }, [searchParams]);

  const getCurrentItems = () => {
    return listType === "liked" ? likedItems : laterItems;
  };

  const getTotalPages = () => {
    return Math.ceil(getCurrentItems().length / itemsPerPage);
  };

  const getCurrentPageItems = () => {
    const items = getCurrentItems();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const handleDelete = (itemId) => {
    if (listType === "liked") {
      removeFromLiked(itemId);
    } else {
      removeFromLater(itemId);
    }
  };

  const handleMoveToOtherList = (item) => {
    if (listType === "liked") {
      moveToLater(item);
    } else {
      moveToLiked(item);
    }
  };

  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  const handleBack = () => {
    navigate("/home");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (type) => {
    setListType(type);
    setCurrentPage(1);
    navigate(`/mylist?type=${type}`);
  };

  const currentItems = getCurrentPageItems();
  const totalPages = getTotalPages();

  return (
    <div className="mylist-container">
      <header className="mylist-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="mylist-header-title">マイリスト</h1>
      </header>

      <div className="mylist-tabs">
        <button
          className={`tab-button ${listType === "liked" ? "active" : ""}`}
          onClick={() => handleTabChange("liked")}
        >
          <Heart size={16} />
          行きたい！/観たい！ ({likedItems.length})
        </button>
        <button
          className={`tab-button ${listType === "later" ? "active" : ""}`}
          onClick={() => handleTabChange("later")}
        >
          <Clock size={16} />
          また今度！/あとで観る！ ({laterItems.length})
        </button>
      </div>

      <div className="mylist-content">
        {currentItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              {listType === "liked" ? "💝" : "⏰"}
            </div>
            <h3>まだアイテムがありません</h3>
            <p>スワイプして気になるアイテムを保存しましょう</p>
          </div>
        ) : (
          <>
            <div className="mylist-grid">
              {currentItems.map((item) => (
                <div key={item.id} className="mylist-card">
                  <div className="card-image">
                    <img src={item.image_url} alt={item.name} />
                  </div>

                  <div className="card-content">
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-genre">{item.genre}</p>

                    {item.rating && (
                      <div className="card-rating">
                        <span className="rating-star">⭐</span>
                        <span className="rating-value">{item.rating}</span>
                        <span className="rating-count">
                          ({item.rating_count})
                        </span>
                      </div>
                    )}

                    <div className="card-area">
                      {item.area}
                      {item.prefecture && item.prefecture !== "全国" && (
                        <span className="card-prefecture">
                          ・{item.prefecture}
                        </span>
                      )}
                    </div>

                    <div className="card-tags">
                      {item.tags?.slice(0, 2).map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="card-actions">
                      <button
                        className="action-button delete"
                        onClick={() => handleDelete(item.id)}
                        title="削除"
                      >
                        <Trash2 size={16} />
                      </button>

                      <button
                        className="action-button move"
                        onClick={() => handleMoveToOtherList(item)}
                        title={
                          listType === "liked"
                            ? "また今度に移動"
                            : "行きたい！に移動"
                        }
                      >
                        {listType === "liked" ? (
                          <Clock size={16} />
                        ) : (
                          <Heart size={16} />
                        )}
                      </button>

                      <button
                        className="action-button external"
                        onClick={() => handleExternalLink(item.external_url)}
                        title={
                          item.genre === "ドラマ" || item.genre === "アニメ"
                            ? "これを観る！"
                            : "ここに行く！"
                        }
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  前へ
                </button>

                <div className="pagination-info">
                  {currentPage} / {totalPages}
                </div>

                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  次へ
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
