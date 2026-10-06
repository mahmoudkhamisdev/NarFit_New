import {
  ClientItem,
  ClientStatusFilter,
  MOCK_CLIENTS,
} from '@/constants';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ClientCard,
  ClientsActionBar,
  ClientsEmptyState,
  ClientsHeader,
  ClientsSearchFilter,
} from '@/components/features/clients';

export default function ClientsScreen() {
  const insets = useSafeAreaInsets();
  const [clients, setClients] = useState<ClientItem[]>(MOCK_CLIENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<ClientStatusFilter>('all');
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Count by status
  const trainingCount = useMemo(
    () => clients.filter((c) => c.status === 'Training').length,
    [clients]
  );
  const restCount = useMemo(
    () => clients.filter((c) => c.status === 'Rest day').length,
    [clients]
  );

  // Filtered clients by status filter and search query
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      // Status filter
      if (selectedFilter === 'training' && client.status !== 'Training') {
        return false;
      }
      if (selectedFilter === 'rest' && client.status !== 'Rest day') {
        return false;
      }

      // Search query filter
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = client.name.toLowerCase().includes(query);
        const matchesProgram = client.program.toLowerCase().includes(query);
        return matchesName || matchesProgram;
      }

      return true;
    });
  }, [clients, selectedFilter, searchQuery]);

  // Enter selection mode on long press
  const handleCardLongPress = (id: string) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
      setSelectedIds(new Set([id]));
    }
  };

  // Card tap handler
  const handleCardPress = (id: string) => {
    if (isSelectionMode) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }
  };

  // Toggle select all visible filtered items
  const handleToggleSelectAll = () => {
    if (selectedIds.size === filteredClients.length && filteredClients.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredClients.map((c) => c.id)));
    }
  };

  // Cancel selection mode
  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  };

  // Batch delete selected clients
  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;

    Alert.alert(
      'Delete Clients',
      `Are you sure you want to remove ${selectedIds.size} client${
        selectedIds.size > 1 ? 's' : ''
      }?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setClients((prev) => prev.filter((item) => !selectedIds.has(item.id)));
            setIsSelectionMode(false);
            setSelectedIds(new Set());
          },
        },
      ]
    );
  };

  // Restore initial mock data from constants
  const handleResetClients = () => {
    setClients(MOCK_CLIENTS);
    setSearchQuery('');
    setSelectedFilter('all');
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  };

  const isAllSelected =
    filteredClients.length > 0 &&
    selectedIds.size === filteredClients.length;

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Screen Header Area */}
      <View
        className="px-5 pb-3"
        style={{ paddingTop: insets.top + 12 }}
      >
        <ClientsHeader
          isSelectionMode={isSelectionMode}
          isAllSelected={isAllSelected}
          onBackOrCancel={isSelectionMode ? handleCancelSelection : undefined}
          onToggleSelectAll={handleToggleSelectAll}
        />

        <ClientsSearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          totalCount={clients.length}
          trainingCount={trainingCount}
          restCount={restCount}
        />
      </View>

      {/* Clients List */}
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: 12,
          paddingHorizontal: 20,
          paddingBottom: isSelectionMode ? insets.bottom + 95 : insets.bottom + 32,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ClientsEmptyState
            hasNoClients={clients.length === 0}
            onRestoreDemoData={handleResetClients}
          />
        }
        renderItem={({ item }) => (
          <ClientCard
            item={item}
            isSelected={selectedIds.has(item.id)}
            isSelectionMode={isSelectionMode}
            onPress={handleCardPress}
            onLongPress={handleCardLongPress}
          />
        )}
      />

      {/* Floating Selection Mode Bottom Action Bar */}
      <ClientsActionBar
        visible={isSelectionMode}
        selectedCount={selectedIds.size}
        totalVisibleCount={filteredClients.length}
        onCancel={handleCancelSelection}
        onDeleteSelected={handleDeleteSelected}
      />
    </View>
  );
}
