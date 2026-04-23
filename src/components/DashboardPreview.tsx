import dashboardImage from "@/assets/dashboard-preview.png";

export function DashboardPreview() {
  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] overflow-hidden">
      <img
        src={dashboardImage}
        alt="Prévia do dashboard analítico Proativa com benchmark por pilar, perfil comparativo e ranking de empresas"
        className="w-full h-auto block"
        loading="lazy"
      />
    </div>
  );
}
