import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mountain, Landmark, Tent, Camera, Waves, Users } from "lucide-react";

const categories = [
  { icon: Mountain, label: "Adventure", count: "18 tours", color: "bg-orange-50 text-orange-600", filter: "Adventure" },
  { icon: Landmark, label: "Cultural", count: "22 tours", color: "bg-blue-50 text-blue-600", filter: "Culture" },
  { icon: Tent, label: "Trekking", count: "12 tours", color: "bg-emerald-50 text-emerald-600", filter: "Adventure" },
  { icon: Camera, label: "Photography", count: "9 tours", color: "bg-purple-50 text-purple-600", filter: "Culture" },
  { icon: Waves, label: "Lakes & Falls", count: "11 tours", color: "bg-sky-50 text-sky-600", filter: "Relaxation" },
  { icon: Users, label: "Tribal Tours", count: "7 tours", color: "bg-rose-50 text-rose-600", filter: "Culture" },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-body text-xs sm:text-sm tracking-widest text-primary uppercase font-semibold">
              Browse by Category
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Find your kind of journey
            </h2>
          </div>
          <button
            onClick={() => navigate("/tours")}
            className="hidden sm:inline font-body text-sm font-semibold text-primary hover:underline whitespace-nowrap"
          >
            View all →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {categories.map((c, i) => (
            <motion.button
              key={c.label}
              onClick={() => navigate("/tours")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl ${c.color} group-hover:scale-110 transition-transform`}>
                <c.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="text-center">
                <div className="font-display text-xs sm:text-sm font-bold text-foreground leading-tight">
                  {c.label}
                </div>
                <div className="font-body text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                  {c.count}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
