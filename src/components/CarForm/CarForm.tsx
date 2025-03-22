
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const vinSchema = z.object({
  vin: z.string().length(17, "VIN must be exactly 17 characters")
});

const manualSchema = z.object({
  year: z.string().regex(/^\d{4}$/, "Must be a valid year"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required")
});

interface CarFormProps {
  onSubmit: (data: any) => void;
}

export const CarForm: React.FC<CarFormProps> = ({ onSubmit }) => {
  const vinForm = useForm<z.infer<typeof vinSchema>>({
    resolver: zodResolver(vinSchema)
  });

  const manualForm = useForm<z.infer<typeof manualSchema>>({
    resolver: zodResolver(manualSchema)
  });

  return (
    <Tabs defaultValue="vin" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="vin">VIN Entry</TabsTrigger>
        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
      </TabsList>

      <TabsContent value="vin">
        <Form {...vinForm}>
          <form onSubmit={vinForm.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={vinForm.control}
              name="vin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Identification Number (VIN)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 17-character VIN" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Look Up Vehicle</Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="manual">
        <Form {...manualForm}>
          <form onSubmit={manualForm.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={manualForm.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input placeholder="2024" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={manualForm.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make</FormLabel>
                  <FormControl>
                    <Input placeholder="Toyota" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={manualForm.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="Camry" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
};
