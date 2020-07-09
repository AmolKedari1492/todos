import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Hello from './HelloTest';
import User from './UserTest';
import Toggle from './ToggleTest';
import pretty from "pretty";

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// it("renders with or without a name", () => {
//   act(() => {
//     render(<Hello />, container);
//   });
//   expect(container.textContent).toBe("Hey, stranger");

//   act(() => {
//     render(<Hello name="Jenny" />, container);
//   });
//   expect(container.textContent).toBe("Hello, Jenny!");

//   act(() => {
//     render(<Hello name="Margaret" />, container);
//   });
//   expect(container.textContent).toBe("Hello, Margaret!");

//   act(() => {
//     render(<Hello name={null} />, container);
//   });
//   expect(container.textContent).toBe("Hey, stranger");
// });

// it("renders user data", async () => {
//   const fakeUser = {
//     name: "Joni Baez",
//     age: "32",
//     address: "123, Charming Avenue"
//   };
//   jest.spyOn(global, "fetch").mockImplementation(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(fakeUser)
//     })
//   );

//   // Use the asynchronous version of act to apply resolved promises
//   await act(async () => {
//     render(<User id="123" />, container);
//   });

//   expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
//   expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
//   expect(container.textContent).toContain(fakeUser.address);

//   // remove the mock to ensure tests are completely isolated
//   global.fetch.mockRestore();
// });

// it("changes value when clicked", () => {
//   const onChange = jest.fn();
//   act(() => {
//     render(<Toggle onChange={onChange} />, container);
//   });

//   // get ahold of the button element, and trigger some clicks on it
//   const button = document.querySelector("[data-testid=toggle]");
//   expect(button.innerHTML).toBe("Turn on");

//   act(() => {
//     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//   });

//   expect(onChange).toHaveBeenCalledTimes(1);
//   expect(button.innerHTML).toBe("Turn off");

//   act(() => {
//     for (let i = 0; i < 5; i++) {
//       button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//     }
//   });

//   expect(onChange).toHaveBeenCalledTimes(6);
//   expect(button.innerHTML).toBe("Turn on");
// });

it("should render a greeting", () => {
  act(() => {
    render(<Hello />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */

  act(() => {
    render(<Hello name="Jenny" />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */

  act(() => {
    render(<Hello name="Margaret" />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */
});
