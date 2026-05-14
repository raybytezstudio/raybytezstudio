import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

function InquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();

  const services = [
    'Website development',
    'App development',
    'Tools development',
    'Database solutions',
    'Fullstack app development',
    'Fullstack web development',
    'Website redesign',
    'Content creation',
  ];

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const submission = {
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now(),
      };

      const existingSubmissions = JSON.parse(
        localStorage.getItem('inquiries') || '[]'
      );
      existingSubmissions.push(submission);
      localStorage.setItem('inquiries', JSON.stringify(existingSubmissions));

      toast.success('Inquiry submitted successfully. We will contact you soon.', {
        style: { background: 'hsl(var(--primary))', color: '#fff', border: 'none' }
      });
      reset();
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.', {
        style: { background: 'hsl(var(--destructive))', color: '#fff', border: 'none' }
      });
    }
  };

  const inputStyles = "bg-[#2a2a2a] border-transparent focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary text-foreground text-base h-12 smooth-transition font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-3">
          <Label htmlFor="name" className="text-foreground/80 font-bold uppercase tracking-wider text-xs">
            Full Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            className={inputStyles}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="text-sm text-primary font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-3">
          <Label htmlFor="email" className="text-foreground/80 font-bold uppercase tracking-wider text-xs">
            Email Address <span className="text-primary">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            className={inputStyles}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-primary font-medium">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone */}
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-foreground/80 font-bold uppercase tracking-wider text-xs">Phone (Optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className={inputStyles}
            {...register('phone')}
          />
        </div>

        {/* Company */}
        <div className="space-y-3">
          <Label htmlFor="company" className="text-foreground/80 font-bold uppercase tracking-wider text-xs">Company (Optional)</Label>
          <Input
            id="company"
            type="text"
            placeholder="Acme Corp"
            className={inputStyles}
            {...register('company')}
          />
        </div>
      </div>

      {/* Service Interest */}
      <div className="space-y-3">
        <Label htmlFor="service" className="text-foreground/80 font-bold uppercase tracking-wider text-xs">Service of Interest</Label>
        <Select onValueChange={(value) => setValue('service', value)}>
          <SelectTrigger id="service" className={inputStyles}>
            <SelectValue placeholder="Select a core service..." />
          </SelectTrigger>
          <SelectContent className="bg-card border-white/10">
            {services.map((service) => (
              <SelectItem key={service} value={service} className="focus:bg-primary/20 focus:text-foreground cursor-pointer font-medium">
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-3">
        <Label htmlFor="message" className="text-foreground/80 font-bold uppercase tracking-wider text-xs">
          Project Details <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us about your goals, timeline, and requirements..."
          rows={6}
          className={`${inputStyles} resize-none h-auto py-3`}
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && (
          <p className="text-sm text-primary font-medium">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-14 bg-primary text-primary-foreground font-black tracking-widest uppercase text-base hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,107,53,0.4)] smooth-transition mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending Request...' : 'Send Request'}
      </Button>
    </form>
  );
}

export default InquiryForm;