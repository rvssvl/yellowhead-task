import * as React from 'react';
import {TodoListItemType} from '../../../redux/todo-list';
import './styles.css'

type Props = {
    item: TodoListItemType;
};

const TodoListItem: React.FC<Props> = ({ item }) => {
    return (
        <div className="item-card">
            <div>ID: {item.id}</div>
            <div>Title: {item.title}</div>
            <div>Description: {item.description}</div>
            <div>UpdatedAt: {item.updatedAt}</div>
        </div>
    )
};

export default TodoListItem;
