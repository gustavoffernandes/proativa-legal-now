import dashboardImage from "@/assets/dashboard-preview.png";
import { FadeInView } from "./FadeInView";

export function DashboardPreview() {
  return (
    <FadeInView>
      <div className="relative rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] overflow-hidden">
        <img
          src={dashboardImage}
          alt="Prévia do dashboard analítico SSTudo com benchmark por pilar, perfil comparativo e ranking de empresas"
          width={1855}
          height={949}
          loading="lazy"
          decoding="async"
          className="w-full h-auto block"
        />
      </div>
    </FadeInView>
  );
}
