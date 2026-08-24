import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function usePemerintahan() {
  const [pemerintahan, setPemerintahan] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPemerintahan = async () => {
    const { data, error } = await supabase
      .from("pemerintahan")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching pemerintahan:", error);
    } else {
      setPemerintahan(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPemerintahan();
  }, []);

  return { pemerintahan, loading, refetch: fetchPemerintahan };
}
