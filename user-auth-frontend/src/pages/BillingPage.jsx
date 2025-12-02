// BillingPage.jsx - Place this in src/pages or similar, and route to /dashboard/billing
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/utils/auth";
import { getBillingInfo, upgradePlan } from "@/services/auth.service"; // Assume these services exist or add them (e.g., integrate Stripe)
import toast from "react-hot-toast";
import { CreditCard, IndianRupee, CheckCircle } from "lucide-react";

export default function BillingPage() {
  const { user } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loading, setLoading] = useState(false);

  // Mock billing data; replace with real API call
  const [billingInfo, setBillingInfo] = useState({
    plan: "Free",
    nextBilling: "2026-01-02",
    usage: { users: 1, apiCalls: 100 },
    paymentMethod: "Visa **** 1234",
  });

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const result = await upgradePlan({ plan: selectedPlan });
      setBillingInfo({ ...billingInfo, plan: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) });
      toast.success("Plan upgraded successfully!");
    } catch (error) {
      toast.error("Upgrade failed. Please try again.");
    }
    setLoading(false);
  };

  const plans = [
    { id: "free", name: "Free", price: "₹0/month", features: ["Basic Auth", "1 User", "Limited API"], limit: true },
    { id: "pro", name: "Pro", price: "₹299/month", features: ["Full Auth", "Unlimited Users", "OAuth2", "JWT"], limit: false },
    { id: "enterprise", name: "Enterprise", price: "₹499/month", features: ["Custom Domains", "SSO", "Audit Logs", "Priority Support"], limit: false },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Billing</h1>

        {/* Current Plan Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{billingInfo.plan} Plan</h3>
                <p className="text-sm text-muted-foreground">Next billing: {billingInfo.nextBilling}</p>
              </div>
              <Badge variant={billingInfo.plan === "Free" ? "secondary" : "default"}>
                Active
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Users: {billingInfo.usage.users}</div>
              <div>API Calls: {billingInfo.usage.apiCalls}</div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Input value={billingInfo.paymentMethod} disabled className="w-64" />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Upgrade Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Upgrade Your Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={billingInfo.plan.toLowerCase() === plan.id ? "border-primary" : ""}>
                  <CardHeader>
                    <CardTitle className="text-center">{plan.name}</CardTitle>
                    <div className="text-2xl font-bold text-center">{plan.price}</div>
                    {billingInfo.plan.toLowerCase() === plan.id && (
                      <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                        {plan.limit && <span className="text-muted-foreground">(Limited)</span>}
                      </div>
                    ))}
                    <Button
                      onClick={() => setSelectedPlan(plan.id)}
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      className="w-full mt-4"
                      disabled={billingInfo.plan.toLowerCase() === plan.id}
                    >
                      {billingInfo.plan.toLowerCase() === plan.id ? "Current Plan" : "Select Plan"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {selectedPlan !== "free" && (
              <div className="flex justify-center mt-6">
                <Button onClick={handleUpgrade} disabled={loading} className="gap-2">
                  {loading ? "Upgrading..." : "Upgrade Now"}
                  <CreditCard className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}