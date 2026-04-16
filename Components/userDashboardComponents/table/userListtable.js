import { deleteUser } from "@/Components/Auth/adminService";
import { Maximize, SlidersHorizontal } from "lucide-react";
import { Spinner, Table, Alert, Pagination, Button, Dropdown, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

export default function UsersTable({ users, pagination, loading, error, onPageChange, onUserDeleted, onPageSizeChange }) {

    if (loading) return (
        <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
        </div>
    );

    if (error) return (
        <Alert variant="danger">{error}</Alert>
    );
    const handleDelete = async (id) => {


        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
        if (!result.isConfirmed) return;

        try {
            await deleteUser(id);
            onUserDeleted(id);
            await Swal.fire({
                title: "Deleted!",
                text: "User deleted.",
                icon: "success"
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Deleted!",
                text: error.error || "Can't delete",
                icon: "error"
            });
        }
    }



    return (
        <>
            <Table striped bordered hover responsive className="align-middle" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Profession</th>
                        <th>Joined</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.roles}</td>
                            <td>{user.profession}</td>
                            <td>{new Date(user.joined).toLocaleDateString()}</td>
                            <td className="text-center">
                                <Button disabled={user.roles.includes("ROLE_ADMIN")} onClick={() => handleDelete(user.id)} className="badge bg-danger-subtle text-danger border border-danger-subtle">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Row className="align-items-center mt-2">
                <Col xs="auto" className="d-flex align-items-center justify-content-start gap-2">
                    <SlidersHorizontal size={15} className="text-secondary" />
                    <span className="text-secondary small">Rows per page:</span>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                        Per Page
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            
                            <Dropdown.Item  onClick={() => onPageSizeChange(20)}>20 Result</Dropdown.Item>
                            <Dropdown.Item onClick={() => onPageSizeChange(10)}>10 Result</Dropdown.Item>
                            <Dropdown.Item onClick={() => onPageSizeChange(5)}>5 Result</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col  className="d-flex justify-content-center">
                    {/* Pagination */}
                    {pagination && (
                        <Pagination className="justify-content-center">
                            <Pagination.Prev
                                disabled={!pagination.hasPrevious}
                                onClick={() => onPageChange(pagination.previousPage)}
                            />
                            {[...Array(pagination.totalPages)].map((_, i) => (
                                <Pagination.Item
                                    key={i}
                                    active={i === pagination.currentPage}
                                    onClick={() => onPageChange(i)}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                disabled={!pagination.hasNext}
                                onClick={() => onPageChange(pagination.nextPage)}
                            />
                        </Pagination>

                    )}
                </Col>.

            </Row>
        </>
    );
}