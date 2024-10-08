import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../store/taskSlice'; 
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';

export const useFetchTasks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch();

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchTasks(navigate));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [dispatch, navigate]);

  return isLoading;
};
