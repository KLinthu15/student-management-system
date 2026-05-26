import { motion } from "framer-motion";

export default function Users() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold"> Users Page </h1>
      <p className="text-gray-500">
        Admin can manage users here.
      </p>
    </motion.div>
  );
}