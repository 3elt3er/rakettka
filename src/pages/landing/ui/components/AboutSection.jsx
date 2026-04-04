import tablesImage from '@/shared/assets/Столы.png';

export function AboutSection() {
  return (
    <section className="space-y-5" id="about">
      <div className="space-y-3">
        <h2 className="text-3xl font-extrabold leading-none text-brand-ink sm:text-4xl">О клубе</h2>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="space-y-5 text-xl leading-relaxed text-brand-ink">
            <p>Клуб настольного тенниса RakeTTka — место, где рождается азарт и оттачивается мастерство.</p>

            <p>
              У нас ты найдёшь профессиональные столы и освещение, качественное напольное покрытие, индивидуальные и
              групповые тренировки, любительские турниры и, самое главное, дружелюбную атмосферу. Неважно, новичок ты
              или опытный игрок — у нас есть всё для комфортной игры.
            </p>
          </div>

          <div className="overflow-hidden lg:justify-self-end">
            <img
              alt="Игровой зал клуба с теннисными столами"
              className="ml-auto h-60 min-h-[18rem] object-cover"
              src={tablesImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
