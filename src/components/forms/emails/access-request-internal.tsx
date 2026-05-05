import {
  Body,
  Container,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";

type AccessRequestInternalProps = {
  name: string;
  email: string;
  company: string;
  role: string;
  headcount: string;
  industry: string;
  source?: string;
  message?: string;
  locale: string;
};

export function AccessRequestInternalEmail({
  name,
  email,
  company,
  role,
  headcount,
  industry,
  source,
  message,
  locale,
}: AccessRequestInternalProps) {
  return (
    <Html>
      <Body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          backgroundColor: "#fafafa",
          margin: 0,
          padding: "32px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e4e4e7",
            borderRadius: 16,
            padding: 32,
            maxWidth: 560,
          }}
        >
          <Heading style={{ fontSize: 24, marginBottom: 8 }}>
            🎯 New access request
          </Heading>
          <Text style={{ color: "#52525b", marginTop: 0 }}>
            From <strong>{name}</strong> at <strong>{company}</strong>
          </Text>

          <Hr style={{ borderColor: "#e4e4e7", margin: "24px 0" }} />

          <Section>
            <Row label="Name" value={name} />
            <Row label="Email" value={email} />
            <Row label="Company" value={company} />
            <Row label="Role" value={role} />
            <Row label="Team size" value={headcount} />
            <Row label="Industry" value={industry} />
            {source && <Row label="Source" value={source} />}
            <Row label="Locale" value={locale} />
          </Section>

          {message && (
            <>
              <Hr style={{ borderColor: "#e4e4e7", margin: "24px 0" }} />
              <Heading as="h2" style={{ fontSize: 18, marginBottom: 8 }}>
                Message
              </Heading>
              <Text
                style={{
                  whiteSpace: "pre-wrap",
                  color: "#27272a",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {message}
              </Text>
            </>
          )}

          <Hr style={{ borderColor: "#e4e4e7", margin: "24px 0" }} />
          <Text style={{ fontSize: 12, color: "#71717a", margin: 0 }}>
            FlorioIn marketing site — automated submission
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <Text
        style={{
          fontSize: 12,
          color: "#71717a",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          margin: 0,
          marginBottom: 2,
        }}
      >
        {label}
      </Text>
      <Text style={{ fontSize: 15, color: "#09090b", margin: 0 }}>
        {value}
      </Text>
    </div>
  );
}
