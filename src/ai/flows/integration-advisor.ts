// src/ai/flows/integration-advisor.ts
'use server';
/**
 * @fileOverview An AI-powered tool to suggest optimal API integration strategies.
 *
 * - integrationAdvisor - A function that handles the integration advice process.
 * - IntegrationAdvisorInput - The input type for the integrationAdvisor function.
 * - IntegrationAdvisorOutput - The return type for the integrationAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrationAdvisorInputSchema = z.object({
  servicesNeeded: z
    .array(z.string())
    .describe('A list of iGaming services needed (e.g., Casino Games, Sportsbook, Payment Solutions).'),
  platformType: z
    .string()
    .describe('The type of iGaming platform (e.g., Existing Platform, New Platform, White Label).'),
});
export type IntegrationAdvisorInput = z.infer<typeof IntegrationAdvisorInputSchema>;

const IntegrationAdvisorOutputSchema = z.object({
  integrationStrategy: z
    .string()
    .describe('A detailed strategy for optimal API integration, considering the services needed and platform type.'),
});
export type IntegrationAdvisorOutput = z.infer<typeof IntegrationAdvisorOutputSchema>;

export async function integrationAdvisor(input: IntegrationAdvisorInput): Promise<IntegrationAdvisorOutput> {
  return integrationAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'integrationAdvisorPrompt',
  input: {schema: IntegrationAdvisorInputSchema},
  output: {schema: IntegrationAdvisorOutputSchema},
  prompt: `You are an expert iGaming API integration advisor.

  Based on the client's needs, provide a detailed strategy for optimal API integration.
  Consider the services needed and the platform type to create a tailored approach.

  Services Needed: {{servicesNeeded}}
  Platform Type: {{platformType}}`,
});

const integrationAdvisorFlow = ai.defineFlow(
  {
    name: 'integrationAdvisorFlow',
    inputSchema: IntegrationAdvisorInputSchema,
    outputSchema: IntegrationAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
