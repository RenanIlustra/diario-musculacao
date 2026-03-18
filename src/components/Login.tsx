'use client';

import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Chrome, Dumbbell } from 'lucide-react';

export function Login() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="flex flex-col items-center max-w-sm w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Dumbbell className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-black tracking-tighter text-foreground italic">GYM TRACKER</h1>
          </div>
          <p className="text-muted-foreground uppercase tracking-widest font-semibold text-sm">
            Evolua sua carga, domine seu treino.
          </p>
        </div>

        <div className="w-full space-y-4 bg-card p-8 rounded-3xl border border-border shadow-2xl">
          <h2 className="text-xl font-bold">Boas-vindas ao seu diário</h2>
          <p className="text-sm text-muted-foreground">Logue com sua conta Google para salvar e sincronizar sua evolução.</p>
          
          <Button 
            onClick={handleLogin}
            className="w-full h-14 text-lg font-bold flex items-center justify-center gap-3 bg-white text-black hover:bg-white/90"
          >
            <Chrome className="w-6 h-6" />
            ENTRAR COM GOOGLE
          </Button>
        </div>
      </div>
    </div>
  );
}
