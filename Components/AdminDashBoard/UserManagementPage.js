"use client"
import { userList } from "@/Components/Auth/adminService";
import UsersTable from "@/Components/userDashboardComponents/table/userListtable";
import { adminDashboardUserSearch } from "@/Components/Validations/validationSchema";
import { FilterIcon, ImportIcon, Search, SortAscIcon, UserPlus } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button, Col, Container, Dropdown, Form, FormGroup, Navbar, Row } from "react-bootstrap";
import { useDebouncedCallback } from "use-debounce";

export default function UserManagementPage() {

    const searchParams = useSearchParams();// used to read the current URL's query string.
    const router = useRouter();
    const pathname = usePathname();
    const [addmember, setAddMember] = useState(false);

    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchError, setSearchError] = useState("");

    const [queryParams, setQueryParams] = useState({
        page: Number(searchParams.get("page")) || 0,
        size: Number(searchParams.get("size")) || 10,
        search: searchParams.get("search") || "",
        sortBy: searchParams.get("sortBy") || "createdAt",
        sortDir: searchParams.get("sortDir") || "desc",
        role: searchParams.get("role") || ""
    });

    const updateURL = (params) => {
        const urlParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                urlParams.set(key, String(value));
            }
        });
        router.replace(`${pathname}?${urlParams.toString()}`);

    };

    const updateQuery = (newParams) => {
        const updated = { ...queryParams, ...newParams };
        setQueryParams(updated);
        updateURL(updated);
    };


    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userList(queryParams);
            setUsers(response.data);
            setPagination(response.pagination);
        } catch (err) {
            setError(err.error || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [queryParams]);

    //  Debounce + Zod guard
    const handleSearch = useDebouncedCallback((value) => {
        const result = adminDashboardUserSearch.safeParse({ searchUser: value });
        if (!result.success) {
            setSearchError(result.error.issues[0]?.message ?? "Invalid input");
            return;
        }
        setSearchError("");
        //when need any chnages in query for like search,filter then we need to update the url by calling updateURL()  and call the new data
        //here setQueryParams() is a useState when it chnages it will call the useEffect and that will call the fetchUsers and we will get new data 
        updateQuery({ search: value, page: 0 });
        //using this updareQuery we are doing both.
    }, 300);

    const handleAddMember = () => {
        setAddMember(!addmember);
    }
    // Remove deleted user from UI immediately no refetch needed
    const handleUserDeleted = (id) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    return (
        <Container fluid>
            <Row>
                <Col className="d-flex">
                    <Navbar bg="white" expand="lg" className="border-bottom py-2">
                        <Form className="d-flex align-items-center navbar-search">
                            <Form.Group className="input-group input-group-md">
                                <span className="input-group-text bg-light border-end-0">
                                    <Search size={16} className="text-muted" />
                                </span>
                                <Form.Control
                                    type="search"
                                    placeholder="Find User"
                                    className="bg-light border-start-0 ps-0"
                                    defaultValue={queryParams.search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </Form.Group>
                            {searchError && (
                                <small className="text-danger ms-2">{searchError}</small>
                            )}

                        </Form>
                        {/* Right side controls */}
                        <div className="d-flex align-items-center gap-2 ms-auto">

                            {/* Sort */}
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                                    <SortAscIcon size={14} /> Sort
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Header>Sort by</Dropdown.Header>
                                    <Dropdown.Item onClick={() => updateQuery({ sortBy: "id", sortDir: "asc", page: 0 })}>ID</Dropdown.Item>
                                    <Dropdown.Item onClick={() => updateQuery({ sortBy: "username", sortDir: "asc", page: 0 })}>Name A→Z</Dropdown.Item>
                                    <Dropdown.Item onClick={() => updateQuery({ sortBy: "username", sortDir: "desc", page: 0 })}>Name Z→A</Dropdown.Item>
                                    <Dropdown.Item onClick={() => updateQuery({ sortBy: "createdAt", sortDir: "desc", page: 0 })}>Newest first</Dropdown.Item>
                                    <Dropdown.Item onClick={() => updateQuery({ sortBy: "createdAt", sortDir: "asc", page: 0 })}>Oldest first</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* Filter */}
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                                    <FilterIcon size={14} /> Filter
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Header>Role</Dropdown.Header>
                                    <Dropdown.Item onClick={() => updateQuery({ role: "", page: 0 })}>All roles</Dropdown.Item>
                                    <Dropdown.Item onClick={() => updateQuery({ role: "ROLE_ADMIN", page: 0 })}>Admin</Dropdown.Item>
                                    <Dropdown.Item onClick={() => updateQuery({ role: "ROLE_USER", page: 0 })}>User</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        

                            <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                                <ImportIcon size={14} /> Export
                            </Button>

                            <Button variant="primary" size="sm" className="d-flex align-items-center gap-1" onClick={handleAddMember}>
                                <UserPlus size={14} /> Add member
                            </Button>
                        </div>
                    </Navbar>
                </Col>
            </Row>

            <Row>
                <Col>
                    <UsersTable
                        users={users}
                        pagination={pagination}
                        loading={loading}
                        error={error}
                        onPageChange={(newPage) => updateQuery({ page: newPage })}
                        onUserDeleted={handleUserDeleted}
                        onPageSizeChange={(size)=>updateQuery({size:size,page:0, sortBy: "id", sortDir: "asc"})}

                    //this onPageChange is a function that is passed by parent to child.
                    //when chlid component has any updated data un my case, when user chnage pages then this function is called.
                    //onClick={() => onPageChange(pagination.nextPage) by this. 
                    />
                </Col>
            </Row>
        </Container>
    );
}