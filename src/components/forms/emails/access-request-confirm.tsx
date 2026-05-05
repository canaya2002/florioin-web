import {
  Body,
  Container,
  Heading,
  Hr,
  Html,
  Text,
} from "@react-email/components";

type AccessRequestConfirmProps = {
  name: string;
  locale: string;
};

export function AccessRequestConfirmEmail({
  name,
  locale,
}: AccessRequestConfirmProps) {
  const isEs = locale === "es";
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
          <Heading style={{ fontSize: 28, marginBottom: 12 }}>
            {isEs ? `¡Gracias, ${name}!` : `Thanks, ${name}!`}
          </Heading>
          <Text style={{ color: "#27272a", lineHeight: 1.6 }}>
            {isEs
              ? "Recibimos tu solicitud para FlorioIn. Carlos te va a escribir personalmente en las próximas 24 horas con los siguientes pasos."
              : "We received your FlorioIn access request. Carlos will personally email you within 24 hours with next steps."}
          </Text>

          <Hr style={{ borderColor: "#e4e4e7", margin: "24px 0" }} />

          <Heading as="h2" style={{ fontSize: 18, marginBottom: 8 }}>
            {isEs ? "Mientras tanto" : "In the meantime"}
          </Heading>
          <Text
            style={{ color: "#52525b", lineHeight: 1.7, marginTop: 0 }}
          >
            {isEs
              ? "Si tu solicitud es urgente, puedes responder a este email directamente. Si necesitas reorganizar la junta, escríbenos a carlos@florioin.com."
              : "If your request is time-sensitive, you can reply to this email directly. To reschedule, write to carlos@florioin.com."}
          </Text>

          <Hr style={{ borderColor: "#e4e4e7", margin: "24px 0" }} />
          <Text style={{ fontSize: 12, color: "#71717a", margin: 0 }}>
            FlorioIn · florioin.com · The OS of your business, with AI.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
