"use client"
import React, { useState } from 'react';
import { Container, Table, Badge, Form, InputGroup, Dropdown } from "react-bootstrap";
import { Search, Filter, MoreHorizontal, UserPlus, Mail, Shield, Trash2, Edit } from "lucide-react";
import "@/style/User/userlist.css";

const userData = [
    { id: 1, name: "Arjun Kapur", email: "arjun@news.com", role: "Admin", status: "Active", initials: "AK", color: "#0d6efd" },
    { id: 2, name: "Sarah Chen", email: "sarah.c@media.io", role: "Editor", status: "Active", initials: "SC", color: "#6f42c1" },
    { id: 3, name: "Marcus Wright", email: "m.wright@outlook.com", role: "User", status: "Inactive", initials: "MW", color: "#adb5bd" },
];

export default function UsersPage() {
    return (
        <main className="users-page-wrapper py-5">
            <Container>
                {/* --- Header Section --- */}
                <div className="d-md-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="fw-bold h3 mb-1">Team Members</h1>
                        <p className="text-muted mb-0">Manage your team members and their account permissions.</p>
                    </div>
                    <button className="btn btn-dark d-flex align-items-center gap-2 px-4 py-2 mt-3 mt-md-0 rounded-pill">
                        <UserPlus size={18} /> Add Member
                    </button>
                </div>

                {/* --- Filter & Search Bar --- */}
                <div className="d-flex flex-wrap gap-3 mb-4 justify-content-between">
                    <InputGroup className="search-group">
                        <InputGroup.Text className="bg-white border-end-0">
                            <Search size={18} className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search by name or email..."
                            className="border-start-0 ps-0 shadow-none"
                        />
                    </InputGroup>

                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary d-flex align-items-center gap-2 bg-white shadow-sm border-0 px-3">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                </div>

                {/* --- Modern Borderless Table --- */}
                <div className="table-responsive">
                    <Table className="align-middle custom-user-table">
                        <thead>
                            <tr>
                                <th className="text-muted fw-semibold small text-uppercase">Member</th>
                                <th className="text-muted fw-semibold small text-uppercase">Role</th>
                                <th className="text-muted fw-semibold small text-uppercase">Status</th>
                                <th className="text-muted fw-semibold small text-uppercase text-end px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-3 px-2">
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="avatar-circle me-3"
                                                style={{ backgroundColor: `${user.color}15`, color: user.color }}
                                            >
                                                {user.initials}
                                            </div>
                                            <div>
                                                <div className="fw-semibold text-dark mb-0">{user.name}</div>
                                                <div className="text-muted small">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2 text-dark fw-medium">
                                            <Shield size={14} className="text-muted" /> {user.role}
                                        </div>
                                    </td>
                                    <td>
                                        <Badge
                                            bg={user.status === 'Active' ? 'success' : 'secondary'}
                                            className={`status-dot-badge ${user.status.toLowerCase()}`}
                                        >
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="text-end px-4">
                                        <Dropdown align="end">
                                            <Dropdown.Toggle variant="link" className="p-0 no-caret text-muted">
                                                <MoreHorizontal size={20} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-modern shadow-lg border-0">
                                                <Dropdown.Item className="py-2 d-flex align-items-center gap-2">
                                                    <Edit size={14} /> Edit Profile
                                                </Dropdown.Item>
                                                <Dropdown.Item className="py-2 d-flex align-items-center gap-2">
                                                    <Mail size={14} /> Send Email
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item className="py-2 d-flex align-items-center gap-2 text-danger">
                                                    <Trash2 size={14} /> Remove
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </main>
    );
}