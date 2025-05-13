import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "@/components/authForm";

// Mock next/router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({ refresh: jest.fn() }),
}));

describe("AuthForm", () => {
  it("renders the login form by default", () => {
    render(<AuthForm id="auth-form" />);

    expect(screen.getByTestId("form-heading")).toHaveTextContent("Login");
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-signup")).toBeInTheDocument();
  });

  it("renders the sign-up form when 'Sign Up' button is clicked", async () => {
    render(<AuthForm id="auth-form" />);

    fireEvent.click(screen.getByTestId("toggle-signup"));

    expect(await screen.findByTestId("form-heading")).toHaveTextContent(
      "Sign Up"
    );

    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields in login", async () => {
    render(<AuthForm id="auth-form" />);

    fireEvent.click(screen.getByTestId("submit-login"));

    await waitFor(() => {
      expect(screen.getAllByText("This is required.").length).toBeGreaterThan(
        0
      );
    });
  });

  it("shows error for password mismatch on sign-up", async () => {
    render(<AuthForm id="auth-form" />);

    fireEvent.click(screen.getByTestId("toggle-signup"));

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password321" },
    });

    fireEvent.click(screen.getByTestId("submit-signup"));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
  });

  it("can toggle back to login form from signup form", async () => {
    render(<AuthForm id="auth-form" />);

    fireEvent.click(screen.getByTestId("toggle-signup"));

    expect(await screen.findByTestId("form-heading")).toHaveTextContent(
      "Sign Up"
    );

    fireEvent.click(screen.getByTestId("toggle-login"));

    expect(await screen.findByTestId("form-heading")).toHaveTextContent(
      "Login"
    );
  });
});
