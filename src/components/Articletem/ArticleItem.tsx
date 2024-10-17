import React from "react";
import IMAGES from "../../utils/images";
import "./ArticleItem.scss";

import { useNavigate } from "react-router-dom";

const ArticleItem = ({ item, setDeleteModalOpen, setDeletingItem }: any) => {
    const navigate = useNavigate();

    return (
        <tr className="article-item">
            <td>{item.name}</td>
            <td>
                {item.categories.map((item: any) => (
                    <div
                        className="tag"
                        key={item._id}
                    >
                        {item.name}
                    </div>
                ))}
            </td>
            <td>{new Date(item.createdAt).toLocaleDateString("en-US")}</td>
            <td className="action">
                <img
                    src={IMAGES.editIcon}
                    alt="Edit icon"
                    onClick={() => {
                        navigate(`/edit-article?id=${item._id}`);
                    }}
                />
                <img
                    src={IMAGES.trashIcon}
                    alt="Trash icon"
                    onClick={() => {
                        setDeleteModalOpen((prev: boolean) => !prev);
                        setDeletingItem(item);
                    }}
                />
            </td>
        </tr>
    );
};

export default ArticleItem;
