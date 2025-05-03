"use client"
import { Container, Section } from "@/components/common"
import { Icon } from "@/components/icons/icons"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui"

export default function ComponentShowcase() {
  return (
    <Container className="space-y-12 py-8">
      <Section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Logo <ThemeToggle />
        </h2>
        <div className="flex flex-wrap items-center gap-8">
          <Logo size="sm" />
          <Logo size="md" />
          <Logo size="lg" />
        </div>
      </Section>
      <Section className="space-y-4">
        <h2 className="text-2xl font-bold">Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Icon name="home" className="h-6 w-6 text-primary-9" />
          <Icon name="calendar" className="h-6 w-6 text-secondary-9" />
          <Icon name="doctor" className="h-6 w-6 text-info-6" />
          <Icon name="patient" className="h-6 w-6 text-success-6" />
          <Icon name="prescription" className="h-6 w-6 text-warning-6" />
          <Icon name="lab-result" className="h-6 w-6 text-error-5" />
        </div>
      </Section>
      <Section className="space-y-4">
        <h2 className="text-2xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Botão</Button>
          <Button variant="ghost">Botão</Button>
          <Button variant="outline">Botão</Button>
          <Button variant="secondary">Botão</Button>
          <Button variant="link">Botão</Button>
        </div>
      </Section>
    </Container>
  )
}
