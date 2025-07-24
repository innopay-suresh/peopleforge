import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { Switch } from "@/components/ui/switch"
import { Roles } from "@/constants/roles"

export function UserRoleManager({ userId }: { userId: string }) {
  const [roles, setRoles] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRoles = async () => {
    const res = await axios.get(`/users/${userId}/roles`)
    setRoles(res.data)
  }

  const toggleRole = async (role: string) => {
    const updated = roles.includes(role)
      ? roles.filter(r => r !== role)
      : [...roles, role]

    setRoles(updated)
    await axios.put(`/users/${userId}/roles`, updated)
  }

  useEffect(() => { fetchRoles() }, [])

  return (
    <div className="grid gap-2">
      {Roles.ALL_ROLES.map((role) => (
        <div key={role} className="flex items-center justify-between">
          <span className="capitalize">{role.replace("_", " ")}</span>
          <Switch checked={roles.includes(role)} onCheckedChange={() => toggleRole(role)} />
        </div>
      ))}
    </div>
  )
}
