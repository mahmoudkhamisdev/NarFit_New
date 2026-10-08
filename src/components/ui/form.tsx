import { Icon } from '@/components/ui/icon';
import { CircleAlert } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { Shake, ShakeRef } from 'react-native-animation-kit';
import { Text } from '@/components/ui/text';

/* ================= FORM ================= */
export const Form = FormProvider;

/* ================= CONTEXTS ================= */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

/* ================= FORM FIELD ================= */
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

/* ================= HOOK ================= */
export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext?.name });

  if (!fieldContext || !itemContext) {
    throw new Error('useFormField must be used inside <FormField> and <FormItem>');
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    name: fieldContext.name,
    id: itemContext.id,
    ...fieldState,
  };
}

/* ================= FORM ITEM ================= */
export interface FormItemProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function FormItem({ children, className = '', style }: FormItemProps) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <View className={`mb-3 w-full ${className}`} style={style}>
        {children}
      </View>
    </FormItemContext.Provider>
  );
}

/* ================= LABEL ================= */
export interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function FormLabel({ children, className = '' }: FormLabelProps) {
  const { error } = useFormField();

  return (
    <Text
      className={`pb-1.5 text-sm font-semibold text-foreground ${error ? 'text-error' : ''} ${className}`}
    >
      {children}
    </Text>
  );
}

/* ================= CONTROL ================= */
export interface FormControlProps {
  children: React.ReactNode;
}

export function FormControl({ children }: FormControlProps) {
  const { error } = useFormField();
  const shakeRef = useRef<ShakeRef>(null);

  useEffect(() => {
    if (!error) return;
    shakeRef.current?.shake();
  }, [error]);

  return <Shake ref={shakeRef}>{children}</Shake>;
}

/* ================= DESCRIPTION ================= */
export interface FormDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export function FormDescription({ children, className = '' }: FormDescriptionProps) {
  if (!children) return null;

  return (
    <Text className={`pt-1 text-xs text-muted ${className}`}>
      {children}
    </Text>
  );
}

/* ================= MESSAGE ================= */
export interface FormMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export function FormMessage({ children, className = '' }: FormMessageProps) {
  const { error } = useFormField();
  const message = error?.message || children;

  if (!message) return null;

  return (
    <View className={`flex-row items-center gap-1.5 pt-1.5 ${className}`}>
      <Icon as={CircleAlert} size={15} className="text-error" />
      <Text className="text-xs font-medium text-error">
        {String(message)}
      </Text>
    </View>
  );
}
