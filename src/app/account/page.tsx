import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          My Account
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            <Link href="/account" className="block px-4 py-2 bg-primary text-white rounded-lg">
              Account Details
            </Link>
            <Link href="/orders" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Order History
            </Link>
            <Link href="/account/addresses" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Addresses
            </Link>
            <Button variant="ghost" fullWidth className="justify-start text-error hover:bg-error/10">
              Logout
            </Button>
          </div>

          {/* Account Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" value="John Doe" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" value="john@example.com" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input type="tel" value="+1234567890" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <Button>Update Password</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
