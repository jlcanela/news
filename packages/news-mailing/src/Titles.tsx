import { Typography } from "@suid/material";

interface TitleProps {
  children: string;
  align?: "center" | "left" | "right";
  color?: string;
  gutterBottom?: boolean;
}

export function MainTitle({
  children,
  align = "center",
  color = "primary.main",
  gutterBottom = true,
}: TitleProps) {
  return (
    <Typography
      variant="h3"
      sx={{
        fontWeight: 700,
        color: color,
        mb: gutterBottom ? 4 : 0,
        textAlign: align,
        textTransform: "uppercase",
        letterSpacing: 2,
      }}
    >
      {children}
    </Typography>
  );
}

export function SubTitle({
  children,
}: TitleProps) {
  return (
    <Typography
      variant="h5"
      sx={{
        fontWeight: 600,
        color: "secondary.main",
        mb: 2,
        borderBottom: 1,
        borderColor: "secondary.light",
        pb: 1,
      }}
    >
      {children}
    </Typography>
  );
}
