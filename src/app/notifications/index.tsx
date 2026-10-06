import {
  MOCK_NOTIFICATIONS,
  NotificationItem,
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
  NotificationCard,
  NotificationsActionBar,
  NotificationsEmptyState,
  NotificationsFilter,
  NotificationsHeader,
} from '@/components/features/notifications';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread'>('all');
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Count unread notifications
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  // Filtered list based on All or Unread
  const filteredNotifications = useMemo(() => {
    if (selectedFilter === 'unread') {
      return notifications.filter((n) => !n.read);
    }
    return notifications;
  }, [notifications, selectedFilter]);

  // Enter multi-select mode on long press
  const handleCardLongPress = (id: string) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
      setSelectedIds(new Set([id]));
    }
  };

  // Tap handler: toggles selection in selection mode, marks read on normal tap
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
    } else {
      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, read: true } : item))
      );
    }
  };

  // Toggle select all visible filtered notifications
  const handleToggleSelectAll = () => {
    if (selectedIds.size === filteredNotifications.length && filteredNotifications.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredNotifications.map((n) => n.id)));
    }
  };

  // Cancel multi-select mode
  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  };

  // Multi-Read: Mark all selected notifications as read
  const handleMarkSelectedAsRead = () => {
    if (selectedIds.size === 0) return;
    setNotifications((prev) =>
      prev.map((item) =>
        selectedIds.has(item.id) ? { ...item, read: true } : item
      )
    );
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  };

  // Multi-Delete: Delete selected notifications with confirmation
  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;

    Alert.alert(
      'Delete Notifications',
      `Are you sure you want to delete ${selectedIds.size} notification${
        selectedIds.size > 1 ? 's' : ''
      }?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNotifications((prev) =>
              prev.filter((item) => !selectedIds.has(item.id))
            );
            setIsSelectionMode(false);
            setSelectedIds(new Set());
          },
        },
      ]
    );
  };

  // Restore initial mock data from constants
  const handleResetNotifications = () => {
    setNotifications(MOCK_NOTIFICATIONS);
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  };

  const isAllSelected =
    filteredNotifications.length > 0 &&
    selectedIds.size === filteredNotifications.length;

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Screen Header Area */}
      <View
        className="px-5 pb-3"
        style={{ paddingTop: insets.top + 12 }}
      >
        <NotificationsHeader
          isSelectionMode={isSelectionMode}
          isAllSelected={isAllSelected}
          onBackOrCancel={isSelectionMode ? handleCancelSelection : undefined}
          onToggleSelectAll={handleToggleSelectAll}
        />

        <NotificationsFilter
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
          totalCount={notifications.length}
          unreadCount={unreadCount}
        />
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: 12,
          paddingHorizontal: 20,
          paddingBottom: isSelectionMode ? insets.bottom + 95 : insets.bottom + 32,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <NotificationsEmptyState
            filter={selectedFilter}
            hasNoNotifications={notifications.length === 0}
            onRestoreDemoData={handleResetNotifications}
          />
        }
        renderItem={({ item }) => (
          <NotificationCard
            item={item}
            isSelected={selectedIds.has(item.id)}
            isSelectionMode={isSelectionMode}
            onPress={handleCardPress}
            onLongPress={handleCardLongPress}
          />
        )}
      />

      {/* Floating Selection Mode Bottom Action Bar */}
      <NotificationsActionBar
        visible={isSelectionMode}
        selectedCount={selectedIds.size}
        totalVisibleCount={filteredNotifications.length}
        onCancel={handleCancelSelection}
        onMarkSelectedAsRead={handleMarkSelectedAsRead}
        onDeleteSelected={handleDeleteSelected}
      />
    </View>
  );
}
