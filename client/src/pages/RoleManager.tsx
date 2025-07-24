import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';
import type { User } from '../types/user';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { toast } from 'react-toastify';

// Map UI role names to backend role values
const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'HR Manager', value: 'hr_manager' },
  { label: 'HR User', value: 'hr_user' },
  { label: 'Manager', value: 'manager' },
  { label: 'Employee', value: 'employee' },
  { label: 'Leave Approver', value: 'leave_approver' },
  { label: 'Expense Approver', value: 'expense_approver' },
  { label: 'Project Manager', value: 'project_manager' },
  { label: 'Reporting Manager', value: 'reporting_manager' },
  { label: 'Finance', value: 'finance' },
  { label: 'IT Support', value: 'it_support' },
  { label: 'Legal', value: 'legal' },
  { label: 'Recruiter', value: 'recruiter' },
];

export default function RoleManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('employee');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load users');
    }
  };

  const handleInvite = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/users/invite',
        { email, role: inviteRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Invitation sent');
      setEmail('');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to invite user');
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Role updated');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Role Management</h1>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-3">
          <Label htmlFor="invite-email">Invite New User</Label>
          <Input
            id="invite-email"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select value={inviteRole} onValueChange={setInviteRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((role) => (
                <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleInvite}>Send Invitation</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Existing Users</h2>
          <div className="space-y-4">
            {users.map((user: User) => (
              <div key={user.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
                <Select
                  value={user.role}
                  onValueChange={(value: string) => handleRoleChange(user.id, value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Change Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
