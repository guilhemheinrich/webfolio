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
      webfolio_categories: {
        Row: {
          code: string
        }
        Insert: {
          code: string
        }
        Update: {
          code?: string
        }
        Relationships: []
      }
      webfolio_categories_label: {
        Row: {
          category_code: string
          content: string
          id: string
          language_code: string
        }
        Insert: {
          category_code: string
          content: string
          id?: string
          language_code: string
        }
        Update: {
          category_code?: string
          content?: string
          id?: string
          language_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "webfolio_categories_label_category_code_fkey"
            columns: ["category_code"]
            isOneToOne: false
            referencedRelation: "webfolio_categories"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "webfolio_categories_label_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "webfolio_languages"
            referencedColumns: ["code"]
          },
        ]
      }
      webfolio_experience: {
        Row: {
          created_date: string
          end_date: string | null
          modified_date: string
          picture: string | null
          slug: string
          start_date: string | null
        }
        Insert: {
          created_date?: string
          end_date?: string | null
          modified_date?: string
          picture?: string | null
          slug: string
          start_date?: string | null
        }
        Update: {
          created_date?: string
          end_date?: string | null
          modified_date?: string
          picture?: string | null
          slug?: string
          start_date?: string | null
        }
        Relationships: []
      }
      webfolio_experience_description: {
        Row: {
          content: string
          experience_slug: string
          id: string
          language_code: string
        }
        Insert: {
          content: string
          experience_slug: string
          id?: string
          language_code: string
        }
        Update: {
          content?: string
          experience_slug?: string
          id?: string
          language_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "webfolio_experience_description_experience_slug_fkey"
            columns: ["experience_slug"]
            isOneToOne: false
            referencedRelation: "webfolio_experience"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "webfolio_experience_description_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "webfolio_languages"
            referencedColumns: ["code"]
          },
        ]
      }
      webfolio_experience_short_description: {
        Row: {
          content: string
          experience_slug: string
          id: string
          language_code: string
        }
        Insert: {
          content: string
          experience_slug: string
          id?: string
          language_code: string
        }
        Update: {
          content?: string
          experience_slug?: string
          id?: string
          language_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "webfolio_experience_short_description_experience_slug_fkey"
            columns: ["experience_slug"]
            isOneToOne: false
            referencedRelation: "webfolio_experience"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "webfolio_experience_short_description_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "webfolio_languages"
            referencedColumns: ["code"]
          },
        ]
      }
      webfolio_experience_title: {
        Row: {
          content: string
          experience_slug: string
          id: string
          language_code: string
        }
        Insert: {
          content: string
          experience_slug: string
          id?: string
          language_code: string
        }
        Update: {
          content?: string
          experience_slug?: string
          id?: string
          language_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "webfolio_experience_title_experience_slug_fkey"
            columns: ["experience_slug"]
            isOneToOne: false
            referencedRelation: "webfolio_experience"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "webfolio_experience_title_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "webfolio_languages"
            referencedColumns: ["code"]
          },
        ]
      }
      webfolio_languages: {
        Row: {
          code: string
          fr_display: string | null
        }
        Insert: {
          code: string
          fr_display?: string | null
        }
        Update: {
          code?: string
          fr_display?: string | null
        }
        Relationships: []
      }
      webfolio_section: {
        Row: {
          created_date: string
          modified_date: string
          picture: string | null
          slug: string
        }
        Insert: {
          created_date?: string
          modified_date?: string
          picture?: string | null
          slug: string
        }
        Update: {
          created_date?: string
          modified_date?: string
          picture?: string | null
          slug?: string
        }
        Relationships: []
      }
      webfolio_section_content: {
        Row: {
          content: string
          id: string
          language_code: string
          section_slug: string
        }
        Insert: {
          content: string
          id?: string
          language_code: string
          section_slug: string
        }
        Update: {
          content?: string
          id?: string
          language_code?: string
          section_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "webfolio_section_content_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "webfolio_languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "webfolio_section_content_section_slug_fkey"
            columns: ["section_slug"]
            isOneToOne: false
            referencedRelation: "webfolio_section"
            referencedColumns: ["slug"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      upsert_content: {
        Args: {
          query_section_slug: string
          language_tag: string
          new_content: string
        }
        Returns: undefined
      }
      upsert_description: {
        Args: {
          query_experience_slug: string
          language_tag: string
          new_content: string
        }
        Returns: undefined
      }
      upsert_short_description: {
        Args: {
          query_experience_slug: string
          language_tag: string
          new_content: string
        }
        Returns: undefined
      }
      upsert_title: {
        Args: {
          query_experience_slug: string
          language_tag: string
          new_content: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

