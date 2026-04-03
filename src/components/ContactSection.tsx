import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, User, MessageSquare, CheckCircle2 } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    else if (form.name.length > 100) errs.name = "Name too long";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.length > 1000) errs.message = "Message too long (max 1000 chars)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have questions about the project or aerospace engineering? Reach out to Aditya & Divyanshu!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <Card className="bg-gradient-card border-border">
            <CardContent className="pt-8 pb-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle2 className="h-16 w-16 text-secondary mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. We'll get back to you soon.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                      <User className="h-4 w-4" /> Name
                    </label>
                    <Input
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      maxLength={100}
                      className="bg-background/50 border-border focus:border-primary"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4" /> Email
                    </label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      maxLength={255}
                      className="bg-background/50 border-border focus:border-primary"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4" /> Message
                    </label>
                    <Textarea
                      placeholder="Tell us what you're curious about..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      maxLength={1000}
                      rows={4}
                      className="bg-background/50 border-border focus:border-primary"
                    />
                    <div className="flex justify-between">
                      {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                      <p className="text-xs text-muted-foreground mt-1 ml-auto">{form.message.length}/1000</p>
                    </div>
                  </div>
                  <Button type="submit" className="w-full glow-orange hover:scale-[1.02] transition-transform">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
