import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d9eaff,transparent_28%),linear-gradient(135deg,#073675,#0f5fb5_48%,#f4f8ff_48%)]">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="text-white">
          <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white text-xl font-black text-pln-blue shadow-soft">
            VMI
          </div>
          <h1 className="max-w-xl text-4xl font-black leading-tight tracking-normal md:text-5xl">
            Kontrol material KWH Meter dari pabrik sampai ULP.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-blue-50">
            Frontend operasional PT. PLN Nusa Daya untuk permintaan, inspeksi,
            gudang, pengiriman, GPS tracking, dan pelaporan.
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
            {['Gudang', 'Kurir', 'UP3'].map((item) => (
              <div
                className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur"
                key={item}
              >
                <span className="font-semibold">{item}</span>
                <p className="mt-1 text-blue-100">Realtime</p>
              </div>
            ))}
          </div>
        </section>
        <Outlet />
      </div>
    </main>
  )
}
