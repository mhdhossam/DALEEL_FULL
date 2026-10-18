import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Pencil, Plus, RefreshCw, Search, Trash2, Eye } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { getResourceApi, getResourcePath, getResourceSchema, normalizeRows, ResourceSchema, SchemaField, rowId } from "@/lib/adminSchemaApi";

const pageSize = 10;

function displayValue(value: any, field?: SchemaField, row?: any) {
  if (value === null || value === undefined || value === "") return "—";
  if (field?.type === "relation") {
    const relatedName = row?.[`${field.name}_name`] ?? value?.name ?? value?.title ?? value?.username;
    if (relatedName) return relatedName;
  }
  if (field?.type === "boolean") return <Badge variant="outline">{value ? "نعم" : "لا"}</Badge>;
  if (field?.type === "datetime" || field?.type === "date" || field?.type === "time") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toLocaleString("ar-EG");
  }
  if (typeof value === "object") return value.name ?? value.title ?? value.username ?? JSON.stringify(value);
  return String(value);
}

function ResourceForm({ schema, initial, onSubmit, loading }: { schema: ResourceSchema; initial?: any; onSubmit: (payload: any) => void; loading: boolean }) {
  const editableFields = schema.fields.filter((f) => !f.read_only && f.name !== "id");
  const [form, setForm] = useState<Record<string, any>>(() => Object.fromEntries(editableFields.map((f) => [f.name, initial?.[f.name] ?? (f.type === "boolean" ? false : "")])));

  useEffect(() => {
    setForm(Object.fromEntries(editableFields.map((f) => [f.name, initial?.[f.name] ?? (f.type === "boolean" ? false : "")])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial?.id, schema.name]);

  const set = (name: string, value: any) => setForm((current) => ({ ...current, [name]: value }));

  const preparePayload = () => {
    const payload: Record<string, any> = { ...form };
    for (const field of editableFields) {
      if (field.type === "json" && typeof payload[field.name] === "string") {
        try { payload[field.name] = JSON.parse(payload[field.name]); } catch { /* DRF will return validation details for invalid JSON. */ }
      }
    }
    return payload;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4">
      {editableFields.map((field) => {
        const value = form[field.name];
        return (
          <div key={field.name} className="space-y-2">
            <Label>{field.label}</Label>
            {field.type === "select" ? (
              <Select value={String(value ?? "")} onValueChange={(v) => set(field.name, v)}>
                <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
                <SelectContent>{(field.choices ?? []).map((c) => <SelectItem key={c.value} value={String(c.value)}>{c.label}</SelectItem>)}</SelectContent>
              </Select>
            ) : field.type === "boolean" ? (
              <Select value={value ? "true" : "false"} onValueChange={(v) => set(field.name, v === "true")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="true">نعم</SelectItem><SelectItem value="false">لا</SelectItem></SelectContent>
              </Select>
            ) : field.type === "text" || field.type === "json" ? (
              <Textarea value={typeof value === "object" ? JSON.stringify(value) : value ?? ""} onChange={(e) => set(field.name, e.target.value)} />
            ) : field.type === "relation" ? (
              <RelationInput field={field} value={value} onChange={(v) => set(field.name, v)} />
            ) : field.type === "file" ? (
              <Input type="file" onChange={(e) => set(field.name, e.target.files?.[0] ?? null)} />
            ) : (
              <Input type={field.type === "number" ? "number" : field.type === "email" ? "email" : field.type === "url" ? "url" : "text"} value={value ?? ""} onChange={(e) => set(field.name, field.type === "number" ? e.target.value : e.target.value)} />
            )}
          </div>
        );
      })}
      <div className="md:col-span-2 flex justify-end">
        <Button disabled={loading} onClick={() => onSubmit(preparePayload())} className="rounded-xl bg-primary">
          {loading ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </div>
    </div>
  );
}

function RelationInput({ field, value, onChange }: { field: SchemaField; value: any; onChange: (value: any) => void }) {
  const endpoint = field.related_endpoint;
  const { data = [], isLoading } = useQuery({
    queryKey: ["relation-options", endpoint],
    enabled: !!endpoint,
    queryFn: async () => {
      const api = getResourceApi(endpoint!);
      const response = await api.get(getResourcePath(endpoint!));
      return normalizeRows(response.data);
    },
  });

  if (!endpoint) return <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  return (
    <Select value={String(value?.id ?? value ?? "")} onValueChange={(v) => onChange(Number(v))}>
      <SelectTrigger><SelectValue placeholder={isLoading ? "جاري التحميل..." : "اختر"} /></SelectTrigger>
      <SelectContent>{data.map((option: any) => <SelectItem key={rowId(option)} value={String(rowId(option))}>{option.name ?? option.title ?? option.username ?? rowId(option)}</SelectItem>)}</SelectContent>
    </Select>
  );
}

export default function AdminResourcePage() {
  const { modelName = "" } = useParams();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | undefined>();

  const schemaQuery = useQuery({ queryKey: ["admin-schema", modelName], queryFn: () => getResourceSchema(modelName), enabled: !!modelName });
  const schema = schemaQuery.data;

  const rowsQuery = useQuery({
    queryKey: ["admin-resource", schema?.name, search, page],
    enabled: !!schema,
    queryFn: async () => {
      const api = getResourceApi(schema!.endpoint);
      const params: Record<string, any> = { page, page_size: pageSize };
      if (search && schema!.search_fields.length) params.search = search;
      if (schema!.ordering?.length) params.ordering = schema!.ordering[0];
      const { data } = await api.get(getResourcePath(schema!.endpoint), { params });
      return { rows: normalizeRows(data), count: data?.count ?? normalizeRows(data).length };
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ action, id, payload }: { action: "create" | "update" | "delete"; id?: any; payload?: any }) => {
      const api = getResourceApi(schema!.endpoint);
      const basePath = getResourcePath(schema!.endpoint);
      const url = id == null ? basePath : `${basePath.replace(/\/$/, "")}/${id}/`;
      const containsFile = Object.values(payload ?? {}).some((value) => value instanceof File);
      const requestBody = containsFile
        ? Object.entries(payload).reduce((formData, [key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              formData.append(key, value instanceof File ? value : String(value));
            }
            return formData;
          }, new FormData())
        : payload;

      if (action === "create") return api.post(basePath, requestBody);
      if (action === "update") return api.patch(url, requestBody);
      return api.delete(url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resource", schema?.name] });
      toast.success("تم حفظ التغييرات بنجاح");
      setDialogOpen(false);
      setEditing(undefined);
    },
    onError: () => toast.error("تعذر حفظ التغييرات"),
  });

  const listFields = useMemo(() => {
    if (!schema) return [];
    const allowed = new Set(schema.list_display);
    return schema.fields.filter((f) => allowed.has(f.name));
  }, [schema]);

  if (schemaQuery.isLoading || rowsQuery.isLoading) return <TableSkeleton />;
  if (schemaQuery.isError || rowsQuery.isError || !schema) return <ErrorState />;

  const rows = rowsQuery.data?.rows ?? [];
  const count = rowsQuery.data?.count ?? rows.length;
  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  return (
    <div className="space-y-8 animate-fadeUp rtl pb-12">
      <SEO title={`إدارة ${schema.label}`} description={`إدارة ${schema.label} من لوحة تحكم دليل`} />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-deep p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div><h1 className="text-3xl font-bold font-heading mb-1">إدارة {schema.label}</h1><p className="text-white/70">صفحة مولدة تلقائياً من تعريف المورد في Django</p></div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => rowsQuery.refetch()} className="rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20"><RefreshCw className="ml-2 w-4 h-4" />تحديث</Button>
          <Button onClick={() => { setEditing(undefined); setDialogOpen(true); }} className="rounded-xl bg-primary text-white"><Plus className="ml-2 w-4 h-4" />إضافة</Button>
        </div>
      </div>

      <div className="flex gap-3 items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-navy-soft/10 dark:border-slate-800 shadow-sm">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="بحث..." className="border-0 shadow-none focus-visible:ring-0" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-navy-soft/10 dark:border-slate-800">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow className="bg-navy-soft/5 dark:bg-slate-800/50">{listFields.map((f) => <TableHead key={f.name} className="text-right font-bold">{f.label}</TableHead>)}<TableHead className="w-[180px] text-center">الإجراءات</TableHead></TableRow></TableHeader>
            <TableBody>{rows.length ? rows.map((row) => <TableRow key={rowId(row)}>
              {listFields.map((f) => <TableCell key={f.name}>{displayValue(row[f.name], f, row)}</TableCell>)}
              <TableCell><div className="flex justify-center gap-2">
                <Button variant="ghost" size="icon" asChild><Link to={`/admin/resources/${modelName}/${rowId(row)}`}><Eye className="w-4 h-4" /></Link></Button>
                <Button variant="ghost" size="icon" onClick={() => { setEditing(row); setDialogOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="text-red-600" onClick={() => window.confirm("هل أنت متأكد من الحذف؟") && mutation.mutate({ action: "delete", id: rowId(row) })}><Trash2 className="w-4 h-4" /></Button>
              </div></TableCell>
            </TableRow>) : <TableRow><TableCell colSpan={listFields.length + 1} className="text-center py-12 text-muted-foreground">لا توجد بيانات</TableCell></TableRow>}</TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{count} سجل</span>
        <div className="flex gap-2 items-center"><Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>السابق</Button><span>{page} / {totalPages}</span><Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>التالي</Button></div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent className="max-w-3xl rtl"><DialogHeader><DialogTitle>{editing ? `تعديل ${schema.label}` : `إضافة ${schema.label}`}</DialogTitle></DialogHeader><ResourceForm schema={schema} initial={editing} loading={mutation.isPending} onSubmit={(payload) => mutation.mutate({ action: editing ? "update" : "create", id: editing ? rowId(editing) : undefined, payload })} /></DialogContent></Dialog>
    </div>
  );
}

export function AdminResourceDetailPage() {
  const { modelName = "", id = "" } = useParams();
  const schemaQuery = useQuery({ queryKey: ["admin-schema", modelName], queryFn: () => getResourceSchema(modelName) });
  const schema = schemaQuery.data;
  const detailQuery = useQuery({
    queryKey: ["admin-resource-detail", modelName, id],
    enabled: !!schema,
    queryFn: async () => {
      const api = getResourceApi(schema!.endpoint);
      const url = `${getResourcePath(schema!.endpoint).replace(/\/$/, "")}/${id}/`;
      const { data } = await api.get(url);
      return data;
    },
  });

  if (schemaQuery.isLoading || detailQuery.isLoading) return <TableSkeleton />;
  if (schemaQuery.isError || detailQuery.isError || !schema) return <ErrorState />;
  const row = detailQuery.data;

  return <div className="space-y-6 rtl">
    <div className="flex items-center gap-3"><Button variant="ghost" size="icon" asChild><Link to={`/admin/resources/${modelName}`}><ArrowRight className="w-5 h-5" /></Link></Button><div><h1 className="text-3xl font-bold text-navy-deep dark:text-white">تفاصيل {schema.label}</h1><p className="text-muted-foreground">#{id}</p></div></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{schema.fields.map((field) => <div key={field.name} className="bg-white dark:bg-slate-900 rounded-2xl border border-navy-soft/10 dark:border-slate-800 p-5"><div className="text-sm text-muted-foreground mb-2">{field.label}</div><div className="font-semibold text-navy-deep dark:text-white break-words">{displayValue(row[field.name], field, row)}</div></div>)}</div>
  </div>;
}
