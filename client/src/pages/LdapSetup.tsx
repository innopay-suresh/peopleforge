import { useState } from "react";
import axios from "../lib/axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";

export default function LDAPSetup() {
  const [form, setForm] = useState({
    host: "",
    port: 389,
    useSSL: false,
    bindDN: "",
    password: "",
    baseDN: "",
  });

  const [loading, setLoading] = useState(false);

  const updateField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("/api/ldap/configure", form);
      toast.success("✅ LDAP configuration saved");
    } catch (err) {
      toast.error("❌ Failed to save configuration");
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/ldap/test", form);
      if (res.data.success) {
        toast.success("✅ LDAP connection successful");
      } else {
        toast.error("❌ Connection failed: " + res.data.message);
      }
    } catch (err) {
      toast.error("❌ Error testing connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">LDAP Configuration</h2>

      <div className="space-y-4">
        <div>
          <Label>Hostname / IP</Label>
          <Input
            placeholder="e.g. ldap.company.com"
            value={form.host}
            onChange={(e) => updateField("host", e.target.value)}
          />
        </div>

        <div>
          <Label>Port</Label>
          <Input
            type="number"
            placeholder="389 or 636"
            value={form.port}
            onChange={(e) => updateField("port", Number(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={form.useSSL}
            onCheckedChange={(val) => updateField("useSSL", val)}
          />
          <Label>Use SSL (LDAPS)</Label>
        </div>

        <div>
          <Label>Bind DN</Label>
          <Input
            placeholder="cn=admin,dc=example,dc=com"
            value={form.bindDN}
            onChange={(e) => updateField("bindDN", e.target.value)}
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
          />
        </div>

        <div>
          <Label>Base DN</Label>
          <Input
            placeholder="dc=example,dc=com"
            value={form.baseDN}
            onChange={(e) => updateField("baseDN", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          className="border border-gray-400 bg-white text-gray-800 hover:bg-gray-100"
          onClick={handleTest}
          disabled={loading}
        >
          Test Connection
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
