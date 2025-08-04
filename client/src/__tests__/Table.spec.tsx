import { render, screen, fireEvent } from "@testing-library/react";
import { Table, Column } from "../components/Table/TableComp";

interface TestData {
  name: string;
  age: number;
}

const mockData: TestData[] = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 32 },
];

const columns: Column<TestData>[] = [
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
];

describe("Table Component", () => {
  it("renders table headers and rows", () => {
    render(
      <Table
        data={mockData}
        columns={columns}
        page={1}
        totalPages={1}
        itemsPerPage={5}
        onPageChange={() => {}}
      />
    );

    // Check headers
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();

    // Check data
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("28")).toBeInTheDocument();
  });

  it("displays empty message when no data", () => {
    render(
      <Table
        data={[]}
        columns={columns}
        page={1}
        totalPages={1}
        itemsPerPage={5}
        onPageChange={() => {}}
        emptyMessage='No data available'
      />
    );

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  // it("calls onSortChange when column header is clicked", () => {
  //   const onSortChange = jest.fn();

  //   render(
  //     <Table
  //       data={mockData}
  //       columns={columns}
  //       page={1}
  //       totalPages={1}
  //       itemsPerPage={5}
  //       onPageChange={() => {}}
  //       onSortChange={onSortChange}
  //     />
  //   );

  //   fireEvent.click(screen.getByText("Name"));
  //   expect(onSortChange).toHaveBeenCalledWith("name", "asc");

  //   fireEvent.click(screen.getByText("Name"));
  //   expect(onSortChange).toHaveBeenCalledWith("name", "desc");
  // });

  // it("renders search input and triggers onSearchChange", () => {
  //   const onSearchChange = jest.fn();

  //   render(
  //     <Table
  //       data={mockData}
  //       columns={columns}
  //       page={1}
  //       totalPages={1}
  //       itemsPerPage={5}
  //       onPageChange={() => {}}
  //       onSearchChange={onSearchChange}
  //     />
  //   );

  //   const input = screen.getByPlaceholderText("Search...");
  //   fireEvent.change(input, { target: { value: "bob" } });

  //   expect(onSearchChange).toHaveBeenCalledWith("bob");
  // });

  // it("calls onPageChange when pagination button is clicked", () => {
  //   const onPageChange = jest.fn();

  //   render(
  //     <Table
  //       data={mockData}
  //       columns={columns}
  //       page={1}
  //       totalPages={3}
  //       itemsPerPage={5}
  //       onPageChange={onPageChange}
  //     />
  //   );

  //   fireEvent.click(screen.getByText("2"));
  //   expect(onPageChange).toHaveBeenCalledWith(2);
  // });
});
