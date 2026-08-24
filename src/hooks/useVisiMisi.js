import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useVisiMisi() {
  const [visiMisi, setVisiMisi] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVisiMisi = async () => {
    const { data, error } = await supabase
      .from("visi_misi")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching visi misi:", error);
    } else {
      setVisiMisi(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVisiMisi();
  }, []);

  return { visiMisi, loading, refetch: fetchVisiMisi };
}
