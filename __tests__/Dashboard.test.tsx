import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "@/app/dashboard/page";
import { Task } from "@/types"; // Ensure Task type is imported

// Mock the Supabase client to return mock task data
jest.mock("@/utils/supabase/client", () => ({
  createClient: jest.fn().mockReturnValue({
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user: { id: "123" } } }),
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: [
            {
              id: "1",
              title: "Test Task",
              description: "This is a test task.",
              status: "Open",
            },
          ], // Mock data
        }),
      }),
    }),
  }),
}));

describe("Dashboard", () => {
  it("renders tasks after fetching them", async () => {
    render(<Dashboard />);

    // Wait for the task to appear
    const taskElement = await screen.findByTestId("task");

    // Verify the task element is rendered with correct data
    expect(taskElement).toHaveTextContent("Test Task");
  });

  it("displays 'No tasks available' when there are no tasks", async () => {
    // Mock an empty tasks response
    jest.mock("@/utils/supabase/client", () => ({
      createClient: jest.fn().mockReturnValue({
        auth: {
          getUser: jest
            .fn()
            .mockResolvedValue({ data: { user: { id: "123" } } }),
        },
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({
              data: [] as Task[], // Empty array typed as Task[]
            }),
          }),
        }),
      }),
    }));

    render(<Dashboard />);

    // Check for the 'No tasks available' message
    const noTasksMessage = await screen.findByText(
      "No tasks available. Create one!"
    );
    expect(noTasksMessage).toBeInTheDocument();
  });
});
