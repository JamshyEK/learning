import { useEffect, useState } from "react";
import { IUser } from "../interface/interface";
import Button from "../components/FormFields/ButtonComp";
import FormModal from "../components/ModalForm";
import { Column, Table } from "../components/Table/TableComp";
import ConfirmModal from "../components/ConfirmModal";

const Dashboard = () => {
  // Modal Varibles and functions-------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [sortKey, setSortKey] = useState<keyof IUser | undefined>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSortChange = (key: keyof IUser, direction: "asc" | "desc") => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // Modal Varibles and functions---------------

  const userColumns: Column<IUser>[] = [
    { label: "Name", key: "name" },
    { label: "Age", key: "age" },
    { label: "Email", key: "email" },
    {
      label: "Actions",
      key: "_id",
      render: (_, row) => (
        <div className='flex gap-2'>
          <Button onClick={() => onBookHandle(row?.email)} variant='primary'>
            View
          </Button>
          <Button onClick={() => onBookHandle(row?.email)} variant='secondary'>
            Edit
          </Button>
          <Button onClick={() => setIsConfirmModalOpen(true)} variant='danger'>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const userData: IUser[] = [
    { name: "John Doe", age: 28, email: "john@example.com" },
    { name: "Jane Smith", age: 34, email: "jane@example.com" },
    { name: "Sam Green", age: 45, email: "sam@example.com" },
    { name: "John Doe", age: 28, email: "john@example.com" },
    { name: "Jane Smith", age: 34, email: "jane@example.com" },
    { name: "Sam Green", age: 45, email: "sam@example.com" },
    { name: "John Doe", age: 28, email: "john@example.com" },
    { name: "Jane Smith", age: 34, email: "jane@example.com" },
    { name: "Sam Green", age: 45, email: "sam@example.com" },
    { name: "John Doe", age: 28, email: "john@example.com" },
    { name: "Jane Smith", age: 34, email: "jane@example.com" },
    { name: "Sam Green", age: 45, email: "sam@example.com" },
  ];
  //   Pagination start------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const currentData = userData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //   Pagination End-----------------------------------------
  const onBookHandle = (id: string) => {
    alert(id);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className='flex justify-end px-4 py-2'>
        <Button
          type='button'
          className='sidebar-bg'
          variant='confirm'
          onClick={openModal}>
          Show Form Modal
        </Button>
      </div>
      {/* Reusable Table component */}
      <Table<IUser>
        columns={userColumns}
        data={currentData}
        page={currentPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearchChange={() => {}}
        onSortChange={handleSortChange}
        sortKey={sortKey}
        sortDirection={sortDirection}
      />

      <FormModal isOpen={isModalOpen} onClose={closeModal} title='Form Title' />
      {/* Reusable Modal Component */}
      {/* <Modal isOpen={isModalOpen} onClose={closeModal} testId="checkModalComp">
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p>This is a responsive modal popup with a backdrop.</p>
        <div className="px-4 py-2 flex space-x-2">
        <Button type="submit" variant="primary">Submit</Button>
        <Button type="button" variant="primary">Close</Button>
          {/* <CancelButton
            name="Cancel"
            testId="cancelInput"
            onClick={closeModal}
          /> 
        </div>
      </Modal> */}

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title='Confirm Deletion'
        message={`Are you sure you want to delete ?`}
        onConfirm={() => {
          setIsConfirmModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Dashboard;
