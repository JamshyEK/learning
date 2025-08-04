import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../components/Table/Pagination";

describe("Pagination Component", () => {
  const setup = (props = {}) => {
    const defaultProps = {
      currentPage: 1,
      totalPages: 10,
      onPageChange: jest.fn(),
      ...props,
    };
    render(<Pagination {...defaultProps} />);
    return defaultProps;
  };

  it("should not render if totalPages is 1 or less", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders Prev and Next buttons", () => {
    setup();
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it("calls onPageChange with next page number", () => {
    const props = setup({ currentPage: 1 });
    fireEvent.click(screen.getByText(/Next/i));
    expect(props.onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with previous page number", () => {
    const props = setup({ currentPage: 2 });
    fireEvent.click(screen.getByText(/Prev/i));
    expect(props.onPageChange).toHaveBeenCalledWith(1);
  });

  it("disables Prev button on first page", () => {
    setup({ currentPage: 1 });
    expect(screen.getByText(/Prev/i)).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    setup({ currentPage: 10, totalPages: 10 });
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });

  it("highlights the current page", () => {
    setup({ currentPage: 5 });
    const currentBtn = screen.getByRole("button", { name: "5" });
    expect(currentBtn).toHaveClass("bg-sidebar text-white");
  });

  it("shows ellipsis when pages are truncated", () => {
    setup({ currentPage: 5, totalPages: 20 });
    expect(screen.getAllByText("...").length).toBeGreaterThan(0);
  });

  it("calls onPageChange with specific page number when number is clicked", () => {
    const props = setup({ currentPage: 3 });
    fireEvent.click(screen.getByRole("button", { name: "4" }));
    expect(props.onPageChange).toHaveBeenCalledWith(4);
  });
});
