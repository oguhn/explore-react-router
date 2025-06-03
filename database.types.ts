export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      action_pick: {
        Row: {
          benefits: string[]
          created_at: string
          description: string
          id: string
          image: string
          title: string
          updated_at: string
        }
        Insert: {
          benefits: string[]
          created_at?: string
          description: string
          id: string
          image: string
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: string[]
          created_at?: string
          description?: string
          id?: string
          image?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          ai_message: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email: string
          id: number
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          ai_message?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          id?: number
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          ai_message?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          id?: number
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      user_action_history: {
        Row: {
          action: string
          count: number
          created_at: string
          description: string | null
          id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          action: string
          count?: number
          created_at?: string
          description?: string | null
          id?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          action?: string
          count?: number
          created_at?: string
          description?: string | null
          id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_action_pick: {
        Row: {
          action_pick_id: string
          completed_at: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          is_completed: boolean
          is_deleted: boolean
          profile_id: number
          started_at: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          action_pick_id: string
          completed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id: string
          is_completed?: boolean
          is_deleted?: boolean
          profile_id?: number
          started_at?: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          action_pick_id?: string
          completed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_completed?: boolean
          is_deleted?: boolean
          profile_id?: number
          started_at?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_action_pick_action_pick_id_action_pick_id_fk"
            columns: ["action_pick_id"]
            isOneToOne: false
            referencedRelation: "action_pick"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_action_pick_profile_id_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_action_pick_user_id_profile_user_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_ranking: {
        Row: {
          created_at: string
          display_name: string
          id: number
          last_action_at: string | null
          rank: number | null
          score: number
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: number
          last_action_at?: string | null
          rank?: number | null
          score?: number
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: number
          last_action_at?: string | null
          rank?: number | null
          score?: number
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
