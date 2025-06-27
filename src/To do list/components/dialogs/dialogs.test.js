import { render, screen, fireEvent } from "@testing-library/react";
import Updatedialog from "./Updatedialog";
import Deletedialog from "./Deletedialog";


describe("Updatedialog Component (using Integration Test)", () => {
    test("should display the update dialog with title when update is true", () => {
        render(
            <Updatedialog
                update={true}
                updateValue={{ title: "عنوان", details: "تفاصيل" }}
                setUpdateValue={() => {}}
                handleUpdateClose={() => {}}
                handleUpdateConfirm={() => {}}
            />
        );
        const dialogTitle = screen.getByText(/تعديل المهمة/i);
        expect(dialogTitle).toBeInTheDocument();
    });


        test("should call handleUpdateClose when clicking the close button", () => {
        const mockClose = jest.fn();
        render(
            <Updatedialog
                update={true}
                updateValue={{ title: "", details: "" }}
                setUpdateValue={() => {}}
                handleUpdateClose={mockClose}
                handleUpdateConfirm={() => {}}
            />
        );
        const closeButton = screen.getByText("اغلاق");
        fireEvent.click(closeButton);
        expect(mockClose).toHaveBeenCalled();
    });


    test("should call handleUpdateConfirm when clicking the confirm button", () => {
        const mockConfirm = jest.fn();
        render(
            <Updatedialog
                update={true}
                updateValue={{ title: "", details: "" }}
                setUpdateValue={() => {}}
                handleUpdateClose={() => {}}
                handleUpdateConfirm={mockConfirm}
            />
        );
        const confirmButton = screen.getByRole('button', { name: /^تعديل$/i });
        fireEvent.click(confirmButton);
        expect(mockConfirm).toHaveBeenCalled();
    });


    test("should call setUpdateValue when the user edits the title and details fields", () => {
        const mockSetUpdateValue = jest.fn();
        const updateValue = { title: "قديم", details: "تفاصيل قديمة" };
        render(
            <Updatedialog
                update={true}
                updateValue={updateValue}
                setUpdateValue={mockSetUpdateValue}
                handleUpdateClose={() => {}}
                handleUpdateConfirm={() => {}}
            />
        );

        const titleInput = screen.getByLabelText("العنوان");
        fireEvent.change(titleInput, { target: { value: "عنوان جديد" } });

        const detailsInput = screen.getByLabelText("النفاصيل");
        fireEvent.change(detailsInput, { target: { value: "تفاصيل جديدة" } });

        expect(mockSetUpdateValue).toHaveBeenNthCalledWith(1, {
            ...updateValue,
            title: "عنوان جديد"
        });

        expect(mockSetUpdateValue).toHaveBeenNthCalledWith(2, {
            ...updateValue,
            details: "تفاصيل جديدة"
        });;

    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("Deletedialog component (using Integration Test)", () => {
test("should show the delete dialog with confirmation text when Delete is true", () => {
    render(
        <Deletedialog
        Delete={true}
        handleDeleteClose={() => {}}
        handleDeleteConfirm={() => {}}
        />
    );

    expect(screen.getByText(/هل انت متأكد من حذف هذه المهمة/i)).toBeInTheDocument();
    expect(screen.getByText(/لا يمكنك التراجع عن الحذف بعد اتمامه/i)).toBeInTheDocument();
});

test("should call handleDeleteClose when clicking close button", () => {
    const mockClose = jest.fn();

    render(
        <Deletedialog
        Delete={true}
        handleDeleteClose={mockClose}
        handleDeleteConfirm={() => {}}
    />
    );

    const closeButton = screen.getByText("اغلاق");
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalled();
});

test("should call handleDeleteConfirm when clicking confirm button", () => {
    const mockConfirm = jest.fn();

    render(
        <Deletedialog
        Delete={true}
        handleDeleteClose={() => {}}
        handleDeleteConfirm={mockConfirm}
        />
    );

    const confirmButton = screen.getByText("نعم متأكد");
    fireEvent.click(confirmButton);

    expect(mockConfirm).toHaveBeenCalled();
});
});