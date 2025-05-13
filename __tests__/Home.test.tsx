import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// Mock AuthForm to isolate the test
jest.mock("@/components/authForm", () => () => (
  <div data-testid="auth-form">Mocked AuthForm</div>
));

describe("Home Page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders the main heading", () => {
    expect(screen.getByText(/Your Goals Won’t Wait/i)).toBeInTheDocument();
  });

  it("renders the subheading", () => {
    expect(
      screen.getByText(/Keep track of projects and daily tasks/i)
    ).toBeInTheDocument();
  });

  it("renders the AuthForm component", () => {
    expect(screen.getByTestId("auth-form")).toBeInTheDocument();
  });

  it('renders the "Or" divider', () => {
    expect(screen.getByText("Or")).toBeInTheDocument();
  });
});
