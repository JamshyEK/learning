import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import * as sidebarItems from "../utils/sidebarItems";

const mockUser = {
  token: "dummy_token",
  role: "admin", // make sure your `sidebarRouteList` has "admin" routes
};

beforeEach(() => {
  localStorage.setItem("user", JSON.stringify(mockUser));
  jest.spyOn(console, "error").mockImplementation(() => {}); // suppress act() warnings
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

test("renders Sidebar when isOpen is true", () => {
  render(
    <Router>
      <Sidebar isOpen={true} />
    </Router>
  );

  expect(screen.getByText(/My App/i)).toBeInTheDocument();
  expect(screen.getByText("David Green")).toBeInTheDocument();

  // Test role-based links (e.g., for admin)
  const routes = sidebarItems.sidebarRouteList["admin"];
  for (const route of routes) {
    expect(screen.getByText(route.name)).toBeInTheDocument();
  }
});

test("Sidebar should have slide-out class when closed", () => {
  const { container } = render(
    <Router>
      <Sidebar isOpen={false} />
    </Router>
  );

  // Tailwind class when sidebar is closed
  expect(container.firstChild).toHaveClass("-translate-x-full");
});
