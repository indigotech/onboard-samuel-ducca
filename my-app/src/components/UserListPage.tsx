// src/components/UserListPage.tsx
import * as React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function UserListPage() {
  return (
    <div >
    UserListPage
    </div>
  );
}

export default UserListPage;
