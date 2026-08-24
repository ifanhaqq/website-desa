import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useTimeline() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTimeline = async () => {
    const { data, error } = await supabase
      .from("kepala_desa_timeline")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching timeline:", error);
    } else {
      setTimeline(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  return { timeline, loading, refetch: fetchTimeline };
}
