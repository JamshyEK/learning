import { useEffect } from "react";
import { Card } from "../components/Card";
import { useSocket } from "../hooks/useSocket";

export default function TestComponent() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("alert", (data: { message: string }) => {
      console.log(data);
    });

    return () => {
      socket.off("alert");
    };
  }, [socket]);
  return (
    <>
      <div className='p-4'>
        <Card
          title='Project Apollo'
          subtitle='Updated 2 days ago'
          description='Mission-critical dashboard for lunar ops.'
          actions={
            <>
              <button className='text-blue-600 hover:underline text-sm'>
                Edit
              </button>
              <button className='text-red-600 hover:underline text-sm'>
                Delete
              </button>
            </>
          }
          footer={
            <span className='text-xs text-gray-500'>
              Last synced: 24 May 2025
            </span>
          }
          variant='elevated'
        />

        <div className='bg-customBgSideBar text-white p-4 mb-4'>
          This is the sidebar background color
        </div>
        <div className='bg-customBgHeader text-black p-4'>
          This is the header background color
        </div>
      </div>

      <div className='flex flex-wrap gap-4 justify-between p-4'>
        {[0, 1, 2].map((x) => (
          <div className='w-full md:w-[32%]'>
            <Card
              title='Project Apollo'
              subtitle='Updated 2 days ago'
              description='Mission-critical dashboard for lunar ops.'
              // media={
              //   <img
              //     src='/images/apollo.jpg'
              //     alt='Apollo'
              //     className='w-full h-48 object-cover'
              //   />
              // }
              actions={
                <>
                  <button className='text-blue-600 hover:underline text-sm'>
                    Edit
                  </button>
                  <button className='text-red-600 hover:underline text-sm'>
                    Delete
                  </button>
                </>
              }
              footer={
                <span className='text-xs text-gray-500'>
                  Last synced: 24 May 2025
                </span>
              }
              variant='elevated'
            />
          </div>
        ))}
      </div>
    </>
  );
}
