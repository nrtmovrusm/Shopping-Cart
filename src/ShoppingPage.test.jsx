import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Shopping from './ShoppingPage';
import { useOutletContext, BrowserRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom'); // Import actual module
    return {
      ...actual, // Spread actual exports to include everything
      useOutletContext: vi.fn(), // Mock only specific hooks or components
    };
  });

describe("Shopping component", () => {
    it("increments number in shopping cart with button click", async () => {

        // Mocking the useOutletContext to return a mock count and setCount
        const mockSetCount = vi.fn();
        const mockCount = 0;

        // Set up the mock return value for useOutletContext
        useOutletContext.mockReturnValue({
            count: mockCount,
            setCount: mockSetCount,
        });
    
        render(
            <BrowserRouter>
                <Shopping />
            </BrowserRouter>
        );

        const buttons = await screen.findAllByRole('button', { name: /Add to Cart/i });
    
        await userEvent.click(buttons[0]);

        //strict mode 
        expect(mockSetCount).toHaveBeenCalledTimes(2);
    });
})