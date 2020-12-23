import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {fetchTodoListItems, TodoListItemType} from '../../redux/todo-list';
import TodoListItem from './items';


const TodoListPage: React.FC = () => {

    const ids = useSelector((state: RootState) => state.todoList.ids);
    const entities = useSelector((state: RootState) => state.todoList.entities);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodoListItems())
    }, [dispatch]);

    return (
        <div>
            <div>TodoList:</div>
            {
                ids.map(id => {
                    const item = entities[id] as TodoListItemType;
                    return (
                        <TodoListItem item={item} key={item.id}/>
                    )
                })
            }
        </div>
    )
};

export default TodoListPage;
