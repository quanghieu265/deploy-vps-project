import { Button } from '@/components/ui/button';
import { UserData } from '@/lib/types/productTypes';
import services from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

function UsersPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState({ page: 0, size: 10 });

  const { data: userData } = useQuery({
    queryKey: ['users', page],
    queryFn: async () => {
      const res = await services.product.getListUser({
        page: page.size,
        size: page.page,
      });
      return res?.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await services.product.deleteUser(id); // Replace with actual delete function
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleChangePage = (page: { page: number; size: number }) => {
    setPage(page);
  };

  return (
    <>
      <button onClick={() => handleChangePage({ page: page.page - 1, size: page.size })}>
        prev
      </button>
      <button onClick={() => handleChangePage({ page: page.page + 1, size: page.size })}>
        next
      </button>

      <ul>
        {userData?.map((user: UserData) => (
          <li key={user.id}>
            <span className="mr-2">{user.username}</span>
            <Button onClick={() => deleteMutation.mutate(user.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UsersPage;
